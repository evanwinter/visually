import PromiseWorker from "promise-worker"
import T from "types"

const chartWorker = new Worker("../../workers/chart.worker.js")
const chartPromiseWorker = new PromiseWorker(chartWorker)

const chartActions = {
	getChart(analysis) {
		return async (dispatch, getState, api) => {
			dispatch(this.getChartBegin())
			const chart = await chartPromiseWorker.postMessage(analysis)
			console.log(chart)
			dispatch(this.getChartSuccess(chart))
			return chart
		}
	},
	getChartBegin() {
		return {
			type: T.GET_CHART_BEGIN,
		}
	},
	getChartSuccess(chart) {
		return {
			type: T.GET_CHART_SUCCESS,
			chart: chart,
		}
	},

	updateParams: (parameters) => ({
		type: T.UPDATE_CHART_PARAMS,
		parameters: parameters,
	}),

	updateData: (data) => ({
		type: T.UPDATE_CHART_DATA,
		data: data,
	}),

	updateResults: (results) => ({
		type: T.UPDATE_CHART_RESULTS,
		results: results,
	}),
}

export default chartActions
