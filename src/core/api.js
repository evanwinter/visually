import Utils from "./utils"

const DEFAULT_OPTIONS = {
	maxNumSongs: 500,
	perPage: 50,
	sorting: "popularity",
	filter: true,
}

class API {
	constructor(apiToken, options) {
		this.apiToken = apiToken
		this.proxy = "https://cors-anywhere.herokuapp.com/"

		this.geniusURL = this.proxy + "https://genius.com"
		this.apiURL = this.proxy + "https://api.genius.com"

		this.parser = typeof document !== "undefined" && new DOMParser()

		this.options = options || DEFAULT_OPTIONS
	}

	requestify(url) {
		const headers = new Headers({
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.apiToken}`,
		})
		return new Request(url, {
			method: "GET",
			headers: headers,
		})
	}

	throwError(response) {
		throw new Error(
			response.status === 401
				? "Unauthorized. Please ensure your Genius API token is valid."
				: `An error occurred: ${response.status})`,
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
		const artistIncrementFn = (value) => ({
			...value,
			count: (value.count += 1),
		})

		const artistInitialValueFn = (curr) => {
			return {
				artist: curr,
				count: 1,
			}
		}

		const frequencies = Utils.getFrequencies(
			artists,
			artistInitialValueFn,
			artistIncrementFn,
			"id",
		)

		return frequencies
	}

	async fetchSongs(artist) {
		const { perPage, maxNumSongs, sorting } = this.options

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
			}),
		)

		const songs = responses
			.map((page) => page["response"]["songs"])
			.filter((pageSongs) => pageSongs.length > 0)
			.flat()

		return songs
	}

	async fetchLyrics(songsArray, artist) {
		const { filter } = this.options

		const lyricsArray = []

		// Fetch lyrics and release date for each song and attach to the song object
		const songsArrayWithLyrics = await Promise.all(
			// For each song...
			songsArray.map(async (song) => {
				// If primary artist is a match...
				if (song.primary_artist.id === artist.id) {
					// Fetch lyrics for this song
					let [lyrics, releaseDate, album] = await this.scrapeSongData(song)

					// If filtering is enabled, filter out boring/unimportant words
					if (filter) {
						lyrics = lyrics.filter((word) => !Utils.filterWords.includes(word))
					}

					// Add to 'all lyrics' list
					lyricsArray.push(...lyrics)

					// Add a 'lyrics' object to the existing 'song' object
					song.lyrics = {
						all: lyrics,
						frequencies: Utils.getFrequencies(lyrics),
					}

					// Add the 'releaseDate' object to the existing song object
					song.releaseDate = releaseDate

					// Add the 'album' object to the existing song object
					song.album = album

					return song
				}
			}),
		).then((all) => all.filter((song) => song !== undefined))

		return [songsArrayWithLyrics, lyricsArray]
	}

	async fetchDiscography(artist) {
		const songsArray = await this.fetchSongs(artist)
		const [songsArrayWithLyrics, lyricsArray] = await this.fetchLyrics(
			songsArray,
			artist,
		)

		// Reformat the array of songs to an key-value object indexable by song ID
		const songsByID = songsArrayWithLyrics.reduce((acc, song) => {
			acc[song.id] = song
			return acc
		}, {})

		const discography = {
			lyrics: lyricsArray,
			songs: songsByID,
		}

		return discography
	}

	async scrapeSongData(song) {
		const url = this.geniusURL + song.path
		const response = await fetch(url)
		const text = await response.text()
		const html = this.parser.parseFromString(text, "text/html")

		// Scrape lyrics
		const lyrics = Utils.cleanLyrics(html.querySelector("div.lyrics").innerText)

		// Scrape release date
		const releaseDate = Utils.getReleaseDate(html)

		// Scrape album info
		const validateAlbum = !!html.querySelector(".song_album")

		const album = {
			title: "",
			url: "",
			songs: [],
		}

		if (validateAlbum) {
			// get general album info
			const albumInfo = html.querySelector(".song_album-info-title")
			const { title, href } = albumInfo

			// get track listing info
			const trackListEl = html.querySelector(".track_listing")
			const trackEls = trackListEl.querySelectorAll(".track_listing-track a")
			// (TODO) Normalize/clean album title text
			const tracks =
				trackEls &&
				Array.from(trackEls).map((track) =>
					Utils.cleanTrackTitle(track.innerText),
				)

			// attach to album object
			album.title = title
			album.url = href
			album.songs = tracks
			// (TODO) This is assuming every song has same release date as album -- not true bc of pre-release singles
			// Could do something like artist assertion where we find the most common release date amongst a tracklist
			album.releaseDate = releaseDate
		}

		if (lyrics) {
			return [lyrics, releaseDate, album]
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
