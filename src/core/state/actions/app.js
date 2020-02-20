import T from "types"

import artistActions from "./artist"
import discographyActions from "./discography"
import analysisActions from "./analysis"
import chartActions from "./chart"

const appActions = {
	startApp(artist) {
		return async (dispatch, getState, api) => {
			dispatch(this.getAppDataBegin())
			dispatch(artistActions.setArtist(artist))
			const discography = await dispatch(
				discographyActions.getDiscography(artist),
			)
			const analysis = await dispatch(analysisActions.getAnalysis(discography))
			const chart = await dispatch(chartActions.getChart(analysis))
			dispatch(this.getAppDataSuccess())
		}
	},
	getAppDataBegin() {
		return {
			type: T.GET_APP_DATA_BEGIN,
		}
	},
	getAppDataSuccess() {
		return {
			type: T.GET_APP_DATA_SUCCESS,
		}
	},
	toggleSearch() {
		return {
			type: T.TOGGLE_SEARCH,
		}
	},
	toggleMenu() {
		return {
			type: T.TOGGLE_MENU,
		}
	},
}

export default appActions
