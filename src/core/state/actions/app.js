import T from "types"

import { get, set } from "idb-keyval"

import artistActions from "./artist"
import discographyActions from "./discography"
import analysisActions from "./analysis"
import chartActions from "./chart"

import sampleData from "core/data/sample-data.json"

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
	useSampleData() {
		return async (dispatch, getState, api) => {
			const { artist, discography, analysis, chart } = sampleData

			dispatch(this.getAppDataBegin())

			dispatch(artistActions.setArtist(artist))
			dispatch(discographyActions.getDiscographySuccess(discography))
			dispatch(analysisActions.getAnalysisSuccess(analysis))
			dispatch(chartActions.getChartSuccess(chart))

			dispatch(this.getAppDataSuccess())

			return true
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
	openModal(modalID) {
		return {
			type: T.OPEN_MODAL,
			modalID: modalID,
		}
	},
	closeModal() {
		return {
			type: T.CLOSE_MODAL,
		}
	},
	toggleModal(modalID) {
		return {
			type: T.TOGGLE_MODAL,
			modalID: modalID,
		}
	},
	openBottomDrawer() {
		return {
			type: T.OPEN_BOTTOM_DRAWER,
		}
	},
	closeBottomDrawer() {
		return {
			type: T.CLOSE_BOTTOM_DRAWER,
		}
	},
	toggleBottomDrawer() {
		return {
			type: T.TOGGLE_BOTTOM_DRAWER,
		}
	},
	openSideDrawer() {
		return {
			type: T.OPEN_SIDE_DRAWER,
		}
	},
	closeSideDrawer() {
		return {
			type: T.CLOSE_SIDE_DRAWER,
		}
	},
	toggleSideDrawer() {
		return {
			type: T.TOGGLE_SIDE_DRAWER,
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
