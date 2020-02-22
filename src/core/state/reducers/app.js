import T from "types"

const appInitialState = {
	step: T.STEP_INITIAL,
	isLoading: false,
	searchOpen: false,
	menuOpen: false,
}

export default (state = appInitialState, action) => {
	switch (action.type) {
		case T.GET_APP_DATA_BEGIN:
			return {
				...state,
				step: T.STEP_LOADING,
				isLoading: true,
			}
		case T.GET_APP_DATA_SUCCESS:
			return {
				...state,
				step: T.STEP_COMPLETED,
				isLoading: false,
			}
		case T.GET_APP_DATA_ERROR:
			console.error("An error occurred getting app data")
			return state
		case T.TOGGLE_SEARCH:
			return {
				...state,
				searchOpen: !state.searchOpen,
			}
		case T.SET_SEARCH_STATE:
			return {
				...state,
				searchOpen: action.searchOpen,
			}
		case T.TOGGLE_MENU:
			return {
				...state,
				menuOpen: !state.menuOpen,
			}
		case T.SET_STEP:
			return {
				...state,
				step: action.step,
			}
		default:
			return state
	}
}
