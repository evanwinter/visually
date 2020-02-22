import T from "types"

const artistInitialState = {
	api_path: "/artists/72",
	header_image_url: "https://lorempixel.org/300/300",
	id: 72,
	image_url: "https://lorempixel.org/300/300",
	is_meme_verified: false,
	is_verified: false,
	name: "[Placeholder]",
	url: "https://genius.com/artists/Kanye-west",
}

export default (state = artistInitialState, action) => {
	switch (action.type) {
		case T.SET_ARTIST:
			return { ...action.artist }
		default:
			return state
	}
}
