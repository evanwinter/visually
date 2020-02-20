import PromiseWorker from "promise-worker"
import T from "types"
import discographyActions from "./discography"

const analysisWorker = new Worker("../../workers/analysis.worker.js")
const analysisPromiseWorker = new PromiseWorker(analysisWorker)

const analysisActions = {
	getAnalysis(discography) {
		return async (dispatch, getState, api) => {
			dispatch(this.getAnalysisBegin())
			const analysis = await analysisPromiseWorker.postMessage(discography)
			dispatch(this.getAnalysisSuccess(analysis))
			// Update songs in discography store, now that album release dates are added
			const newDiscography = { ...discography, songs: analysis.all.songs }
			dispatch(discographyActions.getDiscographySuccess(newDiscography))
			return analysis
		}
	},
	getAnalysisBegin() {
		return {
			type: T.GET_ANALYSIS_BEGIN,
		}
	},
	getAnalysisSuccess(analysis) {
		return {
			type: T.GET_ANALYSIS_SUCCESS,
			analysis: analysis,
		}
	},
}

export default analysisActions
