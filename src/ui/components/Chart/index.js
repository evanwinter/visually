import React, { useState, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import Utils from "core/utils"
import T from "types"
import { useActions, useIndexedDB } from "hooks"
import LineChart from "./LineChart"
import { ShiftXRange, UpdateXRange } from "../XAxis"
import { UpdateYAxis } from "../YAxis"
import { get, set } from "idb-keyval"

const Chart = () => {
	// Initialize state management
	// Listen to discography data from redux store
	const { artist, analysis, chart } = useSelector((state) => state)
	const { id } = useSelector((state) => state.artist)
	const { step } = useSelector((state) => state.app)

	const dispatch = useDispatch()
	const { chartActions } = useActions()

	// Handle data source updates
	useEffect(() => {
		const needsDataUpdate = true

		// When data source updates, update local chart data store
		if (needsDataUpdate) {
			const data = analysis

			dispatch(chartActions.updateData(data))
		}
	}, [analysis])

	// Generate a new chart when parameters or data change
	useEffect(() => {
		const results = Utils.getGroupLines(chart)
		dispatch(chartActions.updateResults(results))
	}, [chart.parameters, chart.data, chart.filters])

	if (step !== T.STEP_COMPLETED) {
		return ""
	}

	return (
		<div className="Chart">
			<div className="Chart--top-toolbar"></div>
			<div className="Chart--main">
				<LineChart options={chart.options} data={chart.results} />
			</div>
			<div className="Chart--bottom-toolbar">
				<h3>X Axis</h3>
				<ShiftXRange />
				<UpdateXRange />
			</div>
		</div>
	)
}

export default Chart
