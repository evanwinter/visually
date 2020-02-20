import T from "types"

const discographyInitialState = {
	songs: {},
	lyrics: [],
}

export default (state = discographyInitialState, action) => {
	switch (action.type) {
		case T.GET_DISCOGRAPHY_BEGIN:
			return state
		case T.GET_DISCOGRAPHY_SUCCESS:
			return { ...action.discography }
		case T.GET_DISCOGRAPHY_ERROR:
			return state
		default:
			return state
	}
}
