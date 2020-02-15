const INITIAL = "initial"
const LOADING = "loading"
const COMPLETED = "completed"

const appInitialState = {
	step: INITIAL,
	isLoading: false,
	searchOpen: true,
	menuOpen: false,
}

export default app = (state = appInitialState, action) => {
	switch (action.type) {
		case "GET_APP_DATA_BEGIN":
			return {
				...state,
				step: LOADING,
				isLoading: true,
			}
		case "GET_APP_DATA_SUCCESS":
			return {
				...state,
				step: COMPLETED,
				isLoading: false,
			}
		case "GET_APP_DATA_ERROR":
			console.error("An error occurred getting app data")
			return state
		case "TOGGLE_SEARCH":
			return {
				...state,
				searchOpen: !state.searchOpen,
			}
		case "TOGGLE_MENU":
			return {
				...state,
				menuOpen: !state.menuOpen,
			}
		default:
			return state
	}
}
