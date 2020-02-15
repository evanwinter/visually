import artistActions from "./artist"
import discographyActions from "./discography"
import analysisActions from "./analysis"
import chartActions from "./charts"

const appActions = {
	startApp(artist) {
		return async (dispatch, getState, api) => {
			dispatch(this.getAppDataBegin())
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

export default appActions