const searchInitialState = {
	showSuggestions: false,
	results: null,
	isLoading: false,
}

export default search = (state = searchInitialState, action) => {
	switch (action.type) {
		case "HANDLE_QUERY_BEGIN":
			return {
				...state,
				isLoading: true,
			}
		case "HANDLE_QUERY_SUCCESS":
			return {
				...state,
				results: action.results,
				isLoading: false,
			}
		case "HANDLE_QUERY_ERROR":
			return state
		case "SHOW_SUGGESTIONS":
			return {
				...state,
				showSuggestions: true,
			}
		case "HIDE_SUGGESTIONS":
			return {
				...state,
				showSuggestions: false,
			}
		case "CHOOSE_SUGGESTION":
			return {
				...state,
				showSuggestions: false,
			}
		default:
			return state
	}
}
