const registerPromiseWorker = require('promise-worker/register')

registerPromiseWorker(function(discography) {
	const { lyrics, songs } = discography

	const getFrequencies = (lyrics) => {
		return lyrics.reduce((acc, curr) => {
			// if word is new, increment count - else start it at 1
			acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1)
			return acc
		}, {})
	}

	const stats = {
		frequencies: null,
		byYear: null,
		wordsTotal: null,
		lexicalDiversity: null,
	}

	// Get the number of times each word is used throughout the
	// artist's discography.
	stats.frequencies = getFrequencies(lyrics.filtered)
	// stats.byYear = getGroupedByYear(songs)
	// stats.wordsTotal = lyrics.filtered.length
	// stats.wordsUnique = Object.keys(stats.frequencies).length
	// stats.lexicalDiversity = decimalToPercent(stats.wordsUnique/stats.wordsTotal)

	return stats
})
