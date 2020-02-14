import utils from "../utils"
import PromiseWorker from "promise-worker"

const analysisWorker = new Worker("../workers/analysis.worker.js")
const analysisPromiseWorker = new PromiseWorker(analysisWorker)

const chartWorker = new Worker("../workers/chart.worker.js")
const chartPromiseWorker = new PromiseWorker(chartWorker)

const appActions = {
	startApp(artist) {
		return async (dispatch, getState, api) => {
			dispatch(artistActions.setArtist(artist))
			const discography = await dispatch(
				discographyActions.getDiscography(artist),
			)
			const analysis = await dispatch(analysisActions.getAnalysis(discography))
			const chart = await dispatch(chartActions.getChart(discography))
			dispatch(this.getAppDataSuccess())
		}
	},
	getAppDataBegin() {
		return {
			type: "GET_APP_DATA_BEGIN",
		}
	},
	getAppDataSuccess() {
		return {
			type: "GET_APP_DATA_SUCCESS",
		}
	},
	toggleSearch() {
		return {
			type: "TOGGLE_SEARCH",
		}
	},
	toggleMenu() {
		return {
			type: "TOGGLE_MENU",
		}
	},
}

const searchActions = {
	/**
	 * Handle a search query for an artist. If a desired artist can be
	 * determined, show the user suggestions.
	 */
	handleQuery(query) {
		return async (dispatch, getState, api) => {
			dispatch(appActions.getAppDataBegin())
			dispatch(this.handleQueryBegin())
			dispatch(this.hideSuggestions())

			// Fetch search results
			const results = await api.fetchSearchResults(query)
			dispatch(this.handleQuerySuccess(results))

			// Assert artist if there's an exact match or if there's only one result
			const artist = utils.determineArtist(results, query)

			// If we can't assert an artist, show suggestions to the user
			if (!artist) {
				dispatch(this.showSuggestions())
			} else {
				dispatch(appActions.startApp(artist))
			}
		}
	},
	handleQueryBegin() {
		return {
			type: "HANDLE_QUERY_BEGIN",
		}
	},
	handleQuerySuccess(results) {
		return {
			type: "HANDLE_QUERY_SUCCESS",
			results: results,
		}
	},
	showSuggestions() {
		return {
			type: "SHOW_SUGGESTIONS",
		}
	},
	hideSuggestions() {
		return {
			type: "HIDE_SUGGESTIONS",
		}
	},
}

const artistActions = {
	setArtist(artist) {
		return {
			type: "SET_ARTIST",
			artist: artist,
		}
	},
}

const discographyActions = {
	getDiscography(artist) {
		return async (dispatch, getState, api) => {
			dispatch(this.getDiscographyBegin())
			const discography = await api.fetchDiscography(artist)
			dispatch(this.getDiscographySuccess(discography))
			return discography
		}
	},
	getDiscographyBegin() {
		return {
			type: "GET_DISCOGRAPHY_BEGIN",
		}
	},
	getDiscographySuccess(discography) {
		return {
			type: "GET_DISCOGRAPHY_SUCCESS",
			discography: discography,
		}
	},
}

const analysisActions = {
	getAnalysis(discography) {
		return async (dispatch, getState, api) => {
			dispatch(this.getAnalysisBegin())
			const analysis = await analysisPromiseWorker.postMessage(discography)
			dispatch(this.getAnalysisSuccess(analysis))
			// Update songs in discography store, now that album release dates are added
			const newDiscography = { ...discography, songs: analysis.all.songs }
			dispatch(discographyActions.getDiscographySuccess(newDiscography))
			return analysis
		}
	},
	getAnalysisBegin() {
		return {
			type: "GET_ANALYSIS_BEGIN",
		}
	},
	getAnalysisSuccess(analysis) {
		return {
			type: "GET_ANALYSIS_SUCCESS",
			analysis: analysis,
		}
	},
}

const chartActions = {
	getChart(discography) {
		return async (dispatch, getState, api) => {
			dispatch(this.getChartBegin())
			const chart = await chartPromiseWorker.postMessage(discography)
			dispatch(this.getChartSuccess(chart))
			return chart
		}
	},
	getChartBegin() {
		return {
			type: "GET_CHART_BEGIN",
		}
	},
	getChartSuccess(chart) {
		return {
			type: "GET_CHART_SUCCESS",
			chart: chart,
		}
	},
}

export default {
	analysisActions,
	appActions,
	artistActions,
	chartActions,
	discographyActions,
	searchActions,
}
