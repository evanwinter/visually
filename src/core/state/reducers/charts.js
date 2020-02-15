const chartsInitialState = {
	data: null, // data formatted for a chart
}

export default charts = (state = chartsInitialState, action) => {
	switch (action.type) {
		case "GET_CHART_BEGIN":
			return state
		case "GET_CHART_SUCCESS":
			return { ...action.chart }
		case "GET_CHART_ERROR":
			return state
		default:
			return state
	}
}
