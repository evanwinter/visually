import T from "types"

const INITIAL = "initial"
const LOADING = "loading"
const COMPLETED = "completed"

const appInitialState = {
	step: INITIAL,
	isLoading: false,
	searchOpen: false,
	menuOpen: false,
}

export default (state = appInitialState, action) => {
	switch (action.type) {
		case T.GET_APP_DATA_BEGIN:
			return {
				...state,
				step: LOADING,
				isLoading: true,
			}
		case T.GET_APP_DATA_SUCCESS:
			return {
				...state,
				step: COMPLETED,
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
		case T.TOGGLE_MENU:
			return {
				...state,
				menuOpen: !state.menuOpen,
			}
		default:
			return state
	}
}
