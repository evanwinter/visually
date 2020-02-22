import T from "types"
import appActions from "./app"

const discographyActions = {
	getDiscography(artist) {
		return async (dispatch, getState, api) => {
			dispatch(this.getDiscographyBegin())
			dispatch(appActions.setStep(T.STEP_FETCHING_DISCOGRAPHY))
			const discography = await api.fetchDiscography(artist)
			dispatch(this.getDiscographySuccess(discography))
			return discography
		}
	},
	getDiscographyBegin() {
		return {
			type: T.GET_DISCOGRAPHY_BEGIN,
		}
	},
	getDiscographySuccess(discography) {
		return {
			type: T.GET_DISCOGRAPHY_SUCCESS,
			discography: discography,
		}
	},
}

export default discographyActions
