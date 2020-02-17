const registerPromiseWorker = require("promise-worker/register")

registerPromiseWorker(function(analysis) {
	function formatForLineChart(words, frequenciesByYear) {
		/*
			Format: Array of objects where "id" is the word and "data" is an 
			array of objects where "x" is the year and "y" is the word's frequency 
			that year.
			
			const results = [
				{ 
					id: "word",
					data: [
						{ x: year, y: wordFrequencyThisYear },
						...
					]
				},
				...
			]
		*/
		const results = words.reduce((acc, word) => {
			// For each word, create an object which represents a given word's frequency in each year

			const id = word
			const data = Object.entries(frequenciesByYear).map((entry) => {
				const [year, frequencies] = entry
				const yearFrequency = frequencies[word] || 0
				return { x: year, y: yearFrequency }
			})

			acc.push({ id, data })
			return acc
		}, [])

		return results
	}

	// function getLineChartData(targetLyrics, lyricFrequenciesByYear) {
	// 	// For each target lyric...
	// 	const lineChartData = targetLyrics.map((lyric) => {
	// 		// Set up data object
	// 		const lineData = {
	// 			id: lyric,
	// 			data: [],
	// 		}

	// 		// For each year...
	// 		const lineDataPoints = Object.entries(lyricFrequenciesByYear).map(
	// 			(yearData) => {
	// 				const [year, lyricFrequencies] = yearData

	// 				// Get full number of lyrics used
	// 				const lyricsTotal = Object.values(lyricFrequencies).reduce(
	// 					(acc, curr) => acc + curr,
	// 				)
	// 				// Get percent of those lyrics that are this iteration's target lyric
	// 				const lyricFrequencyPercent = lyricFrequencies[lyric] / lyricsTotal

	// 				// Return an object with the year and this target word's frequency that year
	// 				const linePoint = {
	// 					x: year,
	// 					y: lyricFrequencyPercent || 0,
	// 				}

	// 				return linePoint
	// 			},
	// 		)

	// 		lineData.data = lineDataPoints

	// 		return lineData
	// 	})

	// 	return lineChartData
	// }

	// export async function process(discography, analysis) {

	// 	const mostFrequentLyricsByYear = getMostFrequentLyricsByYear(discography, analysis)

	// 	const result = {
	// 		lineData: mostFrequentLyricsByYear
	// 	}

	// 	return result

	// 	// ---------------------------------------------------------------------------

	// // 	function getLyricFrequencies(lyrics) {
	// 		return lyrics.reduce((acc, curr) => {
	// 			// if word is new, increment count - else start it at 1
	// 			acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1)
	// 			return acc
	// 		}, {})
	// 	}

	// 	function getMostFrequentLyricsByYear(discography, analysis) {

	// 		// 1. Get most frequent words
	// 		const { lyricFrequencies } = analysis
	// 		const targetLyrics = getMostFrequentLyrics(lyricFrequencies)

	// 		// 2. Get songs by year
	// 		const { songs } = discography
	// 		const songsData = Object.values(songs)
	// 		const songsByYear = songsData.reduce((acc, curr) => {
	// 			const releaseYear = curr.releaseDate ? curr.releaseDate.year : 'Unknown'
	// 			acc[releaseYear] ? acc[releaseYear].push(curr) : acc[releaseYear] = [curr]
	// 			return acc
	// 		}, {})

	// 		const lyricFrequenciesByYear = Object.entries(songsByYear).reduce((acc, curr) => {
	// 			const [year, songs] = curr
	// 			const yearLyrics = songs.map(song => song.lyrics.filtered).flat(1)
	// 			const yearLyricFrequencies = getLyricFrequencies(yearLyrics)
	// 			acc[year] = yearLyricFrequencies
	// 			return acc
	// 		}, {})

	// 		const lineChartData = getLineChartData(targetLyrics, lyricFrequenciesByYear)

	// 		return lineChartData
	// 	}

	// 	function getMostFrequentLyrics(lyricFrequencies) {
	// 		const lyricFrequenciesSorted = Object.entries(lyricFrequencies).sort((a, b) => b[1] - a[1])
	// 		const mostFrequentLyrics = lyricFrequenciesSorted.slice(0, 10).map((entry => entry[0]))
	// 		return mostFrequentLyrics
	// 	}
	// }

	const { frequencies } = analysis.byYear
	const lyrics = Object.keys(analysis.all.frequencies)
	const results = formatForLineChart(lyrics, frequencies)

	const charts = {
		data: results
	}

	return charts
})
