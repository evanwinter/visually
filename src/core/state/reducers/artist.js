import T from "types"

const artistInitialState = {}

export default (state = artistInitialState, action) => {
	switch (action.type) {
		case T.SET_ARTIST:
			return { ...action.artist }
		default:
			return state
	}
}
