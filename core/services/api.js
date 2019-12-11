import Utils from "./utils"

const DEFAULT_OPTIONS = {
	maxNumSongs: 100,
	perPage: 50,
	sorting: "popularity",
}

class API {
	constructor(apiToken) {
		this.apiToken = apiToken
		this.proxy = "https://cors-anywhere.herokuapp.com/"

		this.geniusURL = this.proxy + "https://genius.com"
		this.apiURL = this.proxy + "https://api.genius.com"

		this.parser = typeof document !== "undefined" && new DOMParser()
	}

	requestify(url) {
		return new Request(url, {
			method: "GET",
			headers: new Headers({ Authorization: `Bearer ${this.apiToken}` }),
		})
	}

	throwError(response) {
		throw new Error(
			response.status === 401
				? "Unauthorized. Please ensure your Genius API token is valid."
				: `An error occurred: ${response.status})`
		)
	}

	async fetchSearchResults(query) {
		const url = `${this.apiURL}/search?q=${query}`
		const request = this.requestify(url)

		// Fetch search results (returns a list of songs)
		const response = await fetch(request)
		if (!response.ok) throw new Error("Error fetching artist")
		const json = await response.json()
		const songs = json.response.hits

		// Create an array with the artists of those songs
		const artists = songs.map((song) => song.result.primary_artist)

		// Create an object with each artist ID and its frequency among the results
		const frequencies = artists.reduce((acc, artist) => {
			// If artist has a count, increment; if not, start count at 1
			if (!!acc[artist.id]) {
				acc[artist.id].count = acc[artist.id].count + 1
			} else {
				acc[artist.id] = {
					artist,
					count: 1,
				}
			}

			return acc
		}, {})

		// Create an array of artist objects found in results, sorted by frequency
		const artistsByFrequency = Object.entries(frequencies).sort((a, b) => {
			return b[1].count - a[1].count
		})

		// const searchResults = artistsByFrequency.map((artist) => {})

		return artistsByFrequency

		// const rankedArtists = Utils.getRankedArtists(artists)
		// const artist = Utils.getMaxArtist(artists, rankedArtists)

		// // Attempt to scrape their bio
		// artist.bio = await this.scrapeArtistBio(artist)

		// return artist
	}

	async fetchDiscography(artist) {
		const { perPage, maxNumSongs, sorting } = DEFAULT_OPTIONS

		const discography = {
			songs: {},
			lyrics: {
				all: [],
				filtered: [],
			},
		}

		// Figure out how many pages to request
		const numPagesToFetch = Utils.calculateNumPages(perPage, maxNumSongs)

		const songsEndpoint = `${this.apiURL}/artists/${artist.id}/songs?per_page=${perPage}&sort=${sorting}`

		// Build an array of requests for each page
		const fetches = []
		for (let i = 1; i <= numPagesToFetch; i++) {
			const url = songsEndpoint + `&page=${i}`
			const request = this.requestify(url)
			fetches.push(request)
		}

		// Fetch each page of songs
		const responses = await Promise.all(
			fetches.map(async (request) => {
				const response = await fetch(request)
				return await response.json()
			})
		)

		// Get an array of 'pages' (arrays of song objects)
		const songsByPage = responses.map((page) => page["response"]["songs"]).filter((pageSongs) => pageSongs.length > 0)

		// Merge all pages of songs into one array of songs
		const songsAll = [].concat(...songsByPage)

		// Create empty array to hold all lyrics
		const lyricsAll = []
		const lyricsFiltered = []

		// Restructure into an object indexable by song ID
		const songsWithLyrics = await Promise.all(
			songsAll.map(async (song) => {
				if (song.primary_artist.id === artist.id) {
					const [lyrics, releaseDate] = await this.scrapeLyrics(song)
					const filtered = lyrics.filter((w) => !Utils.filterWords.includes(w))
					lyricsAll.push(...lyrics)
					lyricsFiltered.push(...filtered)

					song.lyrics = {
						all: [],
						filtered: [],
					}

					song.lyrics.all = lyrics
					song.lyrics.filtered = filtered
					song.releaseDate = releaseDate
					return song
				}
			})
		).then((all) => all.filter((song) => song !== undefined))

		const songsByID = songsWithLyrics.reduce((acc, song) => {
			acc[song.id] = song
			return acc
		}, {})

		discography.songs = songsByID
		discography.lyrics.all = lyricsAll
		discography.lyrics.filtered = lyricsFiltered

		return discography
	}

	async scrapeLyrics(song) {
		const url = this.geniusURL + song.path
		const response = await fetch(url)
		const text = await response.text()
		const html = this.parser.parseFromString(text, "text/html")
		const lyrics = Utils.cleanLyrics(html.querySelector("div.lyrics").innerText)
		const releaseDate = Utils.getReleaseDate(html)
		if (lyrics) {
			return [lyrics, releaseDate]
		} else {
			console.warn(`Couldn't get lyrics for ${song.title} (ID: ${song.id})`)
		}
	}

	async scrapeArtistBio(artist) {
		const url = this.proxy + artist.url
		const response = await fetch(url)
		const text = await response.text()
		const html = this.parser.parseFromString(text, "text/html")
		const bioDiv = html.querySelector("div.rich_text_formatting")
		if (!bioDiv) {
			return null
		}
		const bio = Array.from(bioDiv.querySelectorAll("p"))
		return bio
	}
}

/**
 * Creates a new Api class instance and passes it the provided API token
 */
export const create = (apiToken) => {
	if (!apiToken) {
		throw new Error("API token not provided. Check the README.")
	}
	return new API(apiToken)
}
