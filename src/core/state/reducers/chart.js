import T from "types"

const chartInitialState = {
	filters: {
		words: [],
	},
	parameters: {
		groupUnits: T.DEFAULT_GROUP_UNITS,
		xUnits: T.DEFAULT_X_UNITS,
		yUnits: T.DEFAULT_Y_UNITS,
		xRange: T.DEFAULT_X_RANGE,
		yRange: T.DEFAULT_Y_RANGE,
		sortBy: T.DEFAULT_SORT_BY,
	},
	data: {
		all: {
			lyrics: [],
			frequencies: {},
		},
		byYear: {
			lyrics: [],
			frequencies: {},
		},
		byAlbum: {
			lyrics: [],
			frequencies: {},
		},
	},
	results: [],
	options: {
		xMin: "auto",
		xMax: "auto",
		yMin: "auto",
		yMax: "auto",
	},
}

export default (state = chartInitialState, action) => {
	switch (action.type) {
		case T.GET_CHART_BEGIN:
			return state
		case T.GET_CHART_SUCCESS:
			return state
		case T.GET_CHART_ERROR:
			return state
		case T.UPDATE_CHART_PARAMS:
			return {
				...state,
				parameters: {
					...state.parameters,
					...action.parameters,
				},
			}
		case T.UPDATE_CHART_DATA:
			return {
				...state,
				data: action.data,
			}
		case T.UPDATE_CHART_RESULTS:
			return {
				...state,
				results: action.results,
			}
		default:
			return state
	}
}
