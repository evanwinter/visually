import T from "types"

const analysisInitialState = {
	all: {
		frequencies: {},
		lyrics: [],
		songs: {},
	},
	byYear: {
		frequencies: {},
		lyrics: [],
		songs: {},
	},
	byAlbum: {
		frequencies: {},
		lyrics: [],
		songs: {},
	},
	statistics: {
		totalWords: undefined,
		uniqueWords: undefined,
		lexicalDiversity: undefined,
	},
}

export default (state = analysisInitialState, action) => {
	switch (action.type) {
		case T.GET_ANALYSIS_BEGIN:
			return state
		case T.GET_ANALYSIS_SUCCESS:
			return { ...action.analysis }
		case T.GET_ANALYSIS_ERROR:
			return state
		default:
			return state
	}
}
