const registerPromiseWorker = require("promise-worker/register")

const ALBUM_UNKNOWN = "Album Unknown"

const Discography = {
	songs: undefined,

	injectSongs(songs) {
		this.songs = songs
	},

	getFrequencies(lyrics) {
		return lyrics.reduce((acc, curr) => {
			// if word is new, increment count; else start count at 1
			acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1)
			return acc
		}, {})
	},

	sortSongsByEpoch(songs) {
		return songs.sort((curr, next) => {
			const currEpoch = curr.releaseDate.epoch
			const nextEpoch = next.releaseDate.epoch
			return currEpoch - nextEpoch
		})
	},

	getSongsByYear(songs) {
		// Get array of song objects
		const data = Object.values(songs)

		// Reduce to object of song objects, indexed by release year
		const songsByYear = data.reduce((acc, song) => {
			const { year } = song.releaseDate
			acc[year] ? acc[year].push(song.id) : (acc[year] = [song.id])
			return acc
		}, {})

		return songsByYear
	},

	getLyricsByYear(songsByYear) {
		// Get array of tuples, format [release year, song ID]
		const data = Object.entries(songsByYear)

		// Reduce to object of song lyrics by year, indexed by year
		const lyricsByYear = data.reduce((acc, curr) => {
			const [year, songIDs] = curr
			const lyrics = songIDs.map((songID) => this.songs[songID].lyrics.all).flat()
			acc[year] = lyrics
			return acc
		}, {})

		return lyricsByYear
	},

	getFrequenciesByYear(lyricsByYear) {
		// Get array of tuples, format [release year, song lyrics array]
		const data = Object.entries(lyricsByYear)

		// Reduce to an object of word frequencies by year, indexed by year
		const frequenciesByYear = data.reduce((acc, curr) => {
			const [year, lyrics] = curr
			const frequencies = this.getFrequencies(lyrics)
			acc[year] = frequencies
			return acc
		}, {})

		return frequenciesByYear
	},

	getSongsByAlbum(songs) {
		const data = Object.values(songs)

		const songsByAlbum = data.reduce((acc, song) => {
			const { album } = song

			if (album.title) {
				// If album data exists, add song to album entry or start a new one
				acc[album.title]
					? acc[album.title].push(song.id)
					: (acc[album.title] = [song.id])
			} else {
				// If no album data exists, add song to ALBUM_UNKNOWN entry
				acc[ALBUM_UNKNOWN]
					? acc[ALBUM_UNKNOWN].push(song.id)
					: (acc[ALBUM_UNKNOWN] = [song.id])
			}

			return acc
		}, {})

		return songsByAlbum
	},

	getLyricsByAlbum(songsByAlbum) {
		// Get array of tuples, format [release year, song objects]
		const data = Object.entries(songsByAlbum)

		// Reduce to object of song lyrics by year, indexed by year
		const lyricsByAlbum = data.reduce((acc, curr) => {
			const [album, songIDs] = curr
			const lyrics = songIDs.map((songID) => this.songs[songID].lyrics.all).flat()
			acc[album] = lyrics
			return acc
		}, {})

		return lyricsByAlbum
	},

	getFrequenciesByAlbum(lyricsByAlbum) {
		const data = Object.entries(lyricsByAlbum)

		const frequenciesByAlbum = data.reduce((acc, curr) => {
			const [album, lyrics] = curr
			const frequencies = this.getFrequencies(lyrics)
			acc[album] = frequencies
			return acc
		}, {})

		return frequenciesByAlbum
	},

	decimalToPercent(decimal) {
		return (decimal * 100).toFixed(2)
	},

	setAlbumReleaseDates(songs, songsByAlbum) {
		// Create a key-val object of album release date epochs, format { albumTitle: epoch }
		const data = Object.entries(songsByAlbum)
		const releaseDates = data.reduce((acc, curr) => {
			const [albumTitle, albumSongs] = curr

			// Get frequency of each epoch among this album's songs
			const rankedEpochs = albumSongs.reduce((acc, curr) => {
				const { epoch } = this.songs[curr].releaseDate
				acc[epoch] ? (acc[epoch] += 1) : (acc[epoch] = 1)
				return acc
			}, {})

			// Get the epoch with the highest frequency
			mostCommonEpoch = Object.keys(rankedEpochs).reduce((a, b) =>
				rankedEpochs[a] > rankedEpochs[b] ? a : b,
			)

			// Assign that epoch to this album
			acc[albumTitle] = mostCommonEpoch

			return acc
		}, {})

		// Duplicate master songs object, indexed by song ID, appending album release dates to each object
		const songsWithAlbumReleaseDates = Object.values(songs).reduce(
			(acc, song) => {
				// Look up release date epoch in releaseDates key-val object
				song.album.releaseDate = releaseDates[song.album.title]
				acc[song.id] = song
				return acc
			},
			{},
		)

		return songsWithAlbumReleaseDates
	},
}

registerPromiseWorker(function(discography) {
	// ------------------------------------------------

	// Get per-artist/discography data
	let { lyrics, songs } = discography

	Discography.injectSongs(songs)

	const allFrequencies = Discography.getFrequencies(lyrics)

	// Get per-year data
	const songsByYear = Discography.getSongsByYear(songs)
	const lyricsByYear = Discography.getLyricsByYear(songsByYear)
	const frequenciesByYear = Discography.getFrequenciesByYear(lyricsByYear)

	// Get per-album data
	const songsByAlbum = Discography.getSongsByAlbum(songs)
	const lyricsByAlbum = Discography.getLyricsByAlbum(songsByAlbum)
	const frequenciesByAlbum = Discography.getFrequenciesByAlbum(lyricsByAlbum)

	// Get miscellaneous data
	const totalWords = lyrics.length
	const uniqueWords = Object.keys(allFrequencies).length
	const lexicalDiversity = Discography.decimalToPercent(
		uniqueWords / totalWords,
	)

	songs = Discography.setAlbumReleaseDates(songs, songsByAlbum)

	const analysis = {
		all: {
			frequencies: allFrequencies,
			lyrics: lyrics,
			songs: songs,
		},
		byYear: {
			frequencies: frequenciesByYear,
			lyrics: lyricsByYear,
			songs: songsByYear,
		},
		byAlbum: {
			frequencies: frequenciesByAlbum,
			lyrics: lyricsByAlbum,
			songs: songsByAlbum,
		},
		statistics: {
			totalWords: totalWords,
			uniqueWords: uniqueWords,
			lexicalDiversity: lexicalDiversity,
		},
	}

	return analysis
})
