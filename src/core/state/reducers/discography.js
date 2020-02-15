const discographyInitialState = {
	songs: {},
	lyrics: [],
}

export default discography = (state = discographyInitialState, action) => {
	switch (action.type) {
		case "GET_DISCOGRAPHY_BEGIN":
			return state
		case "GET_DISCOGRAPHY_SUCCESS":
			return { ...action.discography }
		case "GET_DISCOGRAPHY_ERROR":
			return state
		default:
			return state
	}
}
