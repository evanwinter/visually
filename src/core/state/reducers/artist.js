const artistInitialState = {}

export default (state = artistInitialState, action) => {
	switch (action.type) {
		case "SET_ARTIST":
			return { ...action.artist }
		default:
			return state
	}
}
