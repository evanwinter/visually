const discographyActions = {
	getDiscography(artist) {
		return async (dispatch, getState, api) => {
			dispatch(this.getDiscographyBegin())
			const discography = await api.fetchDiscography(artist)
			dispatch(this.getDiscographySuccess(discography))
			return discography
		}
	},
	getDiscographyBegin() {
		return {
			type: "GET_DISCOGRAPHY_BEGIN",
		}
	},
	getDiscographySuccess(discography) {
		return {
			type: "GET_DISCOGRAPHY_SUCCESS",
			discography: discography,
		}
	},
}

export default discographyActions