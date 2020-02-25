import T from "types"

const appInitialState = {
	step: T.STEP_INITIAL,
	isLoading: false,
	bottomDrawerOpen: false,
	sideDrawerOpen: false,
	modalOpen: false,
	modalID: null,
	hasStarted: false,
	hasCompleted: false,
}

export default (state = appInitialState, action) => {
	switch (action.type) {
		case T.GET_APP_DATA_BEGIN:
			return {
				...state,
				step: T.STEP_LOADING,
				hasStarted: true,
				isLoading: true,
			}
		case T.GET_APP_DATA_SUCCESS:
			return {
				...state,
				step: T.STEP_COMPLETED,
				hasCompleted: true,
				isLoading: false,
			}
		case T.GET_APP_DATA_ERROR:
			console.error("An error occurred getting app data")
			return state
		case T.OPEN_SIDE_DRAWER:
			return {
				...state,
				sideDrawerOpen: true,
			}
		case T.CLOSE_SIDE_DRAWER:
			return {
				...state,
				sideDrawerOpen: false,
			}
		case T.TOGGLE_SIDE_DRAWER:
			return {
				...state,
				sideDrawerOpen: !state.sideDrawerOpen,
			}
		case T.OPEN_BOTTOM_DRAWER:
			return {
				...state,
				bottomDrawerOpen: true,
			}
		case T.CLOSE_BOTTOM_DRAWER:
			return {
				...state,
				bottomDrawerOpen: false,
			}
		case T.TOGGLE_BOTTOM_DRAWER:
			return {
				...state,
				bottomDrawerOpen: !state.bottomDrawerOpen,
			}
		case T.SET_STEP:
			return {
				...state,
				step: action.step,
			}
		case T.OPEN_MODAL:
			return {
				...state,
				modalID: action.modalID,
				modalOpen: true,
			}
		case T.CLOSE_MODAL:
			return {
				...state,
				modalID: null,
				modalOpen: false,
			}
		case T.TOGGLE_MODAL:
			return {
				...state,
				modalID: !state.modalOpen ? action.modalID : null,
				modalOpen: !state.modalOpen,
			}
		default:
			return state
	}
}
