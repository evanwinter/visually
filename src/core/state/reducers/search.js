import T from "types"

const searchInitialState = {
	showSuggestions: false,
	results: null,
	isLoading: false,
}

export default (state = searchInitialState, action) => {
	switch (action.type) {
		case T.HANDLE_QUERY_BEGIN:
			return {
				...state,
				isLoading: true,
			}
		case T.HANDLE_QUERY_SUCCESS:
			return {
				...state,
				results: action.results,
				isLoading: false,
			}
		case T.HANDLE_QUERY_ERROR:
			return state
		case T.SHOW_SUGGESTIONS:
			return {
				...state,
				showSuggestions: true,
			}
		case T.HIDE_SUGGESTIONS:
			return {
				...state,
				showSuggestions: false,
			}
		case T.CHOOSE_SUGGESTION:
			return {
				...state,
				showSuggestions: false,
			}
		default:
			return state
	}
}
