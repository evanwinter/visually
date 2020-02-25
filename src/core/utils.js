import T from "types"

export default {
	getGroupStr: (str) => str.substr(2, str.length).toLowerCase(),

	increaseRange(range, step, upperBound = 100) {
		const [min, max] = range
		const outOfBounds = max + step > upperBound
		const newMax = outOfBounds ? upperBound : max + step
		return [min, newMax]
	},

	decreaseRange(range, step, lowerBound = 0) {
		const [min, max] = range
		const outOfBounds = max - step < lowerBound
		const newMax = outOfBounds ? max : max - step
		return [min, newMax]
	},

	shiftRange(range, step, upperBound = 100) {
		const [min, max] = range
		const outOfBounds = max + step > upperBound
		return outOfBounds ? range : range.map((val) => (val += step))
	},

	unshiftRange(range, step, lowerBound = 0) {
		const [min, max] = range
		const outOfBounds = min - step < 0
		const rangeSize = max - min
		const initRange = [0, rangeSize]
		return outOfBounds ? initRange : range.map((val) => (val -= step))
	},

	getAllTime(options) {
		const { data, parameters } = options
		const { yUnits, xRange, groupUnits, sortBy } = parameters

		// All lyric frequencies
		const allFrequencies = data.all.frequencies
		// Sorted by frequency
		const sortedFrequencies = this.getSortedFrequencies(
			allFrequencies,
			sortBy === T.SORT_BY_TOP,
		)

		// Get number of items to show on x-axis (words)
		const [xMin, xMax] = xRange

		// Get frequencies of only the words actually being displayed
		const targetWords = sortedFrequencies
			.slice(xMin, xMax)
			.map((entry) => entry[0])
		const targetFrequencies = targetWords.reduce((acc, word) => {
			acc[word] = allFrequencies[word] || 0
			return acc
		}, {})

		// For each word, get its frequency
		const linePoints = targetWords.map((word) => {
			const wordFrequencyInGroup = targetFrequencies[word] || 0

			const sumFrequenciesInGroup = Object.values(allFrequencies).reduce(
				(acc, curr) => (acc += curr),
			)

			const sumFrequenciesInGroupVisible = Object.values(
				targetFrequencies,
			).reduce((acc, curr) => (acc += curr))

			console.log(allFrequencies, targetFrequencies)

			let yVal = 0

			switch (yUnits) {
				case T.FREQ_PERCENT_GROUP:
					yVal = this.getPercent(wordFrequencyInGroup, sumFrequenciesInGroup)
					break
				case T.FREQ_PERCENT_GROUP_WORDS:
					yVal = this.getPercent(
						wordFrequencyInGroup,
						sumFrequenciesInGroupVisible,
					)
					break
				case T.FREQ_DISCRETE:
					yVal = wordFrequencyInGroup
				default:
					yVal = wordFrequencyInGroup
			}

			return { x: word, y: yVal }
		})

		const artistName =
			Object.values(data.all.songs)[0].primary_artist.name || "This artist"

		// init line object
		const lineDataObject = {
			id: artistName,
			data: linePoints,
		}

		return [lineDataObject]
	},

	getGroupLines(options) {
		const { data, parameters } = options
		const { yUnits, xRange, groupUnits, sortBy } = parameters

		if (groupUnits === T.ALL_TIME) {
			const results = this.getAllTime(options)
			return results
		}

		const allFrequencies = data.all.frequencies
		const groupedFrequencies = data[groupUnits].frequencies
		const sortedFrequencies = this.getSortedFrequencies(
			allFrequencies,
			sortBy === T.SORT_BY_TOP,
		)

		const groupedEntries = Object.entries(groupedFrequencies)

		const linesArray = groupedEntries.reduce((acc, entry) => {
			// group name and an object of word frequencies ({ [word]: [frequency], ... })
			const [groupName, groupFrequencies] = entry

			const [xMin, xMax] = xRange

			const targetWords = sortedFrequencies
				.slice(xMin, xMax)
				.map((entry) => entry[0])

			const targetFrequencies = targetWords.reduce((acc, word) => {
				acc[word] = groupFrequencies[word] || 0
				return acc
			}, {})

			// data is an array of points, format { x: xAxisVal, y: yAxisVal }
			const linePoints = targetWords.map((word) => {
				const wordFrequencyInGroup = targetFrequencies[word] || 0

				const sumFrequenciesInGroup = Object.values(groupFrequencies).reduce(
					(acc, curr) => (acc += curr),
				)

				const sumFrequenciesInGroupVisible = Object.values(
					targetFrequencies,
				).reduce((acc, curr) => (acc += curr))

				let yVal = 0

				switch (yUnits) {
					case T.FREQ_PERCENT_GROUP:
						yVal = this.getPercent(wordFrequencyInGroup, sumFrequenciesInGroup)
						break
					case T.FREQ_PERCENT_GROUP_WORDS:
						yVal = this.getPercent(
							wordFrequencyInGroup,
							sumFrequenciesInGroupVisible,
						)
						break
					case T.FREQ_DISCRETE:
						yVal = wordFrequencyInGroup
					default:
						yVal = wordFrequencyInGroup
				}

				return { x: word, y: yVal }
			})

			// init line object
			const lineDataObject = {
				id: groupName,
				data: linePoints,
			}

			// Add line object to array of line objects
			return [...acc, lineDataObject]
		}, [])

		return linesArray
	},

	getPercent: (count, total) => {
		// Get percent of those lyrics that are this iteration's target lyric
		const decimal = count / total
		const percent = Math.round(decimal * 10000) / 100
		return percent
	},

	getSortedFrequencies: (frequencies, byHighestValue = true) => {
		const objectSortFn = (a, b) => (byHighestValue ? b[1] - a[1] : a[1] - b[1])
		const objectsSortedByValue = Object.entries(frequencies).sort(objectSortFn)
		return objectsSortedByValue
	},

	isEmpty(obj) {
		return Object.entries(obj).length === 0 && obj.constructor === Object
	},

	getRankedArtists(artists) {
		return artists.reduce((counter, artist) => {
			// Increment count for artist if they're already found; start them at 1 if not
			counter[artist.id] =
				counter[artist.id] === undefined ? 1 : counter[artist.id] + 1
			// Set a field on each artist object with its count (so we can find max later)
			// (TODO) Needs to change, see below
			artists.find((a) => a.id === artist.id).count = counter[artist.id]
			return counter
		}, {})
	},

	getMaxArtist(artists, rankedArtists) {
		// Get the highest count
		const max = Math.max(...Object.values(rankedArtists))

		// Get the artist with that count
		// (TODO) !! This is not correct because it breaks on ties
		// Ultimately, though, the plan is to let the user choose
		// from the top N in the UI
		const [isMax] = artists.filter((artist) => artist.count === max)

		// (TODO) Handle ties
		if (isMax.length > 1) {
			throw new Error("Tie!")
		}

		return isMax
	},

	calculateNumPages(perPage, maxNumSongs) {
		const quotient = maxNumSongs / perPage
		const numPages = quotient > 1 ? quotient : 1
		return numPages
	},

	cleanLyrics(lyrics) {
		// Clean (remove punctuation, all to lowercase, etc)
		// (TODO) Revisit this -- this was brute force and probably overkill
		return lyrics
			.replace(/ *\[[^\]]*]/g, "") // remove stuff between brackets
			.replace(/[|&;$%@'<>()+,*!?]/g, "") // remove punctuation/other chars
			.replace(/[0-9]/g, "") // remove digits
			.replace(/[-]/g, " ") // remove '-'
			.toLowerCase() // make all words lowercase
			.replace(/[.]/g, "") // remove empty strings
			.split(/\s/) // ???
			.filter((x) => x !== "") // remove empty strings
	},

	cleanTrackTitle(title) {
		return title.replace(/^[a-zA-Z\s]*$/)
	},

	getReleaseDate(html) {
		const releaseDate = {
			str: "",
			epoch: -1,
			year: "Unknown",
		}

		// Get labels from table of statistics
		const labels = Array.from(
			html.querySelectorAll(".metadata_unit.metadata_unit--table_row"),
		)
		if (!labels) return releaseDate

		// Find the label for release date
		const releaseDateLabel = labels.find(
			(label) =>
				label.querySelector(".metadata_unit-label").innerText ===
				"Release Date",
		)
		if (!releaseDateLabel) return releaseDate

		// Return an object with the (1) string, (2) epoch, and (3) year
		releaseDate.str =
			releaseDateLabel.querySelector(".metadata_unit-info").innerText || false
		releaseDate.epoch = Date.parse(releaseDate.str) || -1
		releaseDate.year = this.epochToYear(releaseDate.epoch) || "Unknown"
		return releaseDate
	},

	epochToYear(epoch) {
		const date = new Date(epoch)
		return date.getFullYear()
	},

	determineArtist(results, query) {
		let artist = null
		// Return if only one result
		if (results.length === 1) {
			console.log(`Only one result found for ${query}`)
			artist = results[0][1].artist
			return artist
		}
		// Return if exact match is found
		const match = this.exactMatch(results, query)
		if (match) {
			console.log(`Exact match found for ${query}`)
			artist = match.artist
			return artist
		}
		return artist
	},

	exactMatch(results, query) {
		return results.find((result) => {
			const nameClean = result[1].artist.name.toLowerCase()
			const queryClean = query.toLowerCase()
			return nameClean === queryClean
		})
	},

	getFrequencies(arr, initialValueFn, incrementFn, keyProperty) {
		const basicUsage = arr && !initialValueFn && !incrementFn && !keyProperty
		const advancedUsage = arr && initialValueFn && incrementFn

		if (!basicUsage && !advancedUsage) {
			throw new Error("Improper use of Utils.getFrequencies function")
		}

		return arr.reduce((acc, curr) => {
			// if custom key property provided, use the key when indexing
			// (e.g. need access to curr.id)
			const key = keyProperty ? curr[keyProperty] : curr

			const init = advancedUsage ? initialValueFn(curr) : 1
			const increment = advancedUsage ? incrementFn : (val) => (val += 1)

			if (acc[key]) {
				acc[key] = increment(acc[key])
			} else {
				acc[key] = init
			}

			return acc
		}, {})
	},

	filterWords: [
		`a`,
		`about`,
		`above`,
		`after`,
		`again`,
		`against`,
		`all`,
		`am`,
		`an`,
		`and`,
		`any`,
		`are`,
		`as`,
		`at`,
		`be`,
		`because`,
		`been`,
		`before`,
		`being`,
		`below`,
		`between`,
		`both`,
		`but`,
		`by`,
		`could`,
		`did`,
		`do`,
		`does`,
		`doing`,
		`down`,
		`during`,
		`each`,
		`few`,
		`for`,
		`from`,
		`further`,
		`had`,
		`has`,
		`have`,
		`having`,
		`he`,
		`he'd`,
		`he'll`,
		`he's`,
		`her`,
		`here`,
		`here's`,
		`hers`,
		`herself`,
		`him`,
		`himself`,
		`his`,
		`how`,
		`how's`,
		`i`,
		`i'd`,
		`i'll`,
		`i'm`,
		`i've`,
		`if`,
		`in`,
		`into`,
		`is`,
		`it`,
		`it's`,
		`its`,
		`itself`,
		`let's`,
		`me`,
		`more`,
		`most`,
		`my`,
		`myself`,
		`nor`,
		`of`,
		`on`,
		`once`,
		`only`,
		`or`,
		`other`,
		`ought`,
		`our`,
		`ours`,
		`ourselves`,
		`out`,
		`over`,
		`own`,
		`same`,
		`she`,
		`she'd`,
		`she'll`,
		`she's`,
		`should`,
		`so`,
		`some`,
		`such`,
		`than`,
		`that`,
		`that's`,
		`the`,
		`their`,
		`theirs`,
		`them`,
		`themselves`,
		`then`,
		`there`,
		`there's`,
		`these`,
		`they`,
		`they'd`,
		`they'll`,
		`they're`,
		`they've`,
		`this`,
		`those`,
		`through`,
		`to`,
		`too`,
		`under`,
		`until`,
		`up`,
		`very`,
		`was`,
		`we`,
		`we'd`,
		`we'll`,
		`we're`,
		`we've`,
		`were`,
		`what`,
		`what's`,
		`when`,
		`when's`,
		`where`,
		`where's`,
		`which`,
		`while`,
		`who`,
		`who's`,
		`whom`,
		`why`,
		`why's`,
		`with`,
		`would`,
		`you`,
		`you'd`,
		`you'll`,
		`you're`,
		`you've`,
		`your`,
		`yours`,
		`yourself`,
		`yourselves`,
	],
}
