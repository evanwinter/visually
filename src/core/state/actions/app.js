import T from "types"

import { get, set } from "idb-keyval"

import artistActions from "./artist"
import discographyActions from "./discography"
import analysisActions from "./analysis"
import chartActions from "./chart"

const appActions = {
	startApp(artist) {
		return async (dispatch, getState, api) => {
			const useCache = true

			dispatch(this.getAppDataBegin())
			dispatch(artistActions.setArtist(artist))

			if (useCache) {
				console.log("Checking for cached value...")
				const key = artist.id

				const cachedValue = await get(key)
				if (cachedValue) {
					console.log("Found cached value", cachedValue)
					dispatch(
						discographyActions.getDiscographySuccess(cachedValue.discography),
					)
					dispatch(analysisActions.getAnalysisSuccess(cachedValue.analysis))
					dispatch(chartActions.getChartSuccess(cachedValue.chart))

					dispatch(this.getAppDataSuccess())
					return true
				}
			}

			const discography = await dispatch(
				discographyActions.getDiscography(artist),
			)
			const analysis = await dispatch(analysisActions.getAnalysis(discography))
			const chart = await dispatch(chartActions.getChart(analysis))

			if (useCache) {
				const key = artist.id

				const value = {
					artist,
					discography,
					analysis,
					chart,
				}

				set(key, value)
			}

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
	setSearchState(searchOpen) {
		return {
			type: T.SET_SEARCH_STATE,
			searchOpen: searchOpen,
		}
	},
	toggleMenu() {
		return {
			type: T.TOGGLE_MENU,
		}
	},
	setStep(step) {
		return {
			type: T.SET_STEP,
			step: step,
		}
	},
}

export default appActions
