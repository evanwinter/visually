import PromiseWorker from "promise-worker"

const chartWorker = new Worker("../../workers/chart.worker.js")
const chartPromiseWorker = new PromiseWorker(chartWorker)

const chartActions = {
	getChart(analysis) {
		return async (dispatch, getState, api) => {
			dispatch(this.getChartBegin())
			const chart = await chartPromiseWorker.postMessage(analysis)
			dispatch(this.getChartSuccess(chart))
			return chart
		}
	},
	getChartBegin() {
		return {
			type: "GET_CHART_BEGIN",
		}
	},
	getChartSuccess(chart) {
		return {
			type: "GET_CHART_SUCCESS",
			chart: chart,
		}
	},
}

export default chartActions