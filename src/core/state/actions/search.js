const searchActions = {
	/**
	 * Handle a search query for an artist. If a desired artist can be
	 * determined, show the user suggestions.
	 */
	handleQuery(query) {
		return async (dispatch, getState, api) => {
			dispatch(this.handleQueryBegin())
			dispatch(this.showSuggestions())

			// Fetch search results
			const results = await api.fetchSearchResults(query)
			dispatch(this.handleQuerySuccess(results))
			
			// // Assert artist if there's an exact match or if there's only one result
			// const artist = utils.determineArtist(results, query)

			// // If we can't assert an artist, show suggestions to the user
			// if (!artist) {
			// 	dispatch(this.showSuggestions())
			// } else {
			// 	dispatch(appActions.startApp(artist))
			// }
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
	clearSearchResults() {
		return {
			type: "CLEAR_SEARCH_RESULTS",
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

export default searchActions