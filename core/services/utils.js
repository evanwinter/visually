export default {
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

	isEmpty(obj) {
		return Object.entries(obj).length === 0 && obj.constructor === Object
	},
	getRankedArtists(artists) {
		return artists.reduce((counter, artist) => {
			// Increment count for artist if they're already found; start them at 1 if not
			counter[artist.id] = counter[artist.id] === undefined ? 1 : counter[artist.id] + 1
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
	getReleaseDate(html) {
		// Get labels from table of statistics
		const labels = Array.from(html.querySelectorAll(".metadata_unit.metadata_unit--table_row"))
		if (!labels) return null

		// Find the label for release date
		const releaseDateLabel = labels.find(
			(label) => label.querySelector(".metadata_unit-label").innerText === "Release Date"
		)
		if (!releaseDateLabel) return null

		// Return an object with the (1) string, (2) epoch, and (3) year
		const str = releaseDateLabel.querySelector(".metadata_unit-info").innerText
		const epoch = Date.parse(str)
		const year = this.epochToYear(epoch)
		return { str, epoch, year }
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
}
