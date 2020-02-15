const artistInitialState = {}

export default artist = (state = artistInitialState, action) => {
	switch (action.type) {
		case "SET_ARTIST":
			return { ...action.artist }
		default:
			return state
	}
}
