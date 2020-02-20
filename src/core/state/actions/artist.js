import T from "types"

const artistActions = {
	setArtist(artist) {
		return {
			type: T.SET_ARTIST,
			artist: artist,
		}
	},
}

export default artistActions
