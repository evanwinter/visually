import React, { useState, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import Utils from "core/utils"
import T from "types"
import { useActions } from "hooks"
import LineChart from "./LineChart"

const Chart = () => {
	// Initialize state management
	// Listen to discography data from redux store
	const { analysis, chart } = useSelector((state) => state)

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
		console.log(chart)
		const results = Utils.getGroupLines(chart)
		dispatch(chartActions.updateResults(results))
	}, [chart.parameters, chart.data, chart.filters])

	const handleGroupUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ groupUnits: e.target.value }))
	}

	const handleYUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ yUnits: e.target.value }))
	}

	const showMoreWords = () => {
		const { xRange } = chart.parameters
		const upperBound = chart.data.all.lyrics.length
		const stepSize = 5
		const newXRange = Utils.increaseRange(xRange, stepSize, upperBound)
		dispatch(chartActions.updateParams({ xRange: newXRange }))
	}

	const showFewerWords = () => {
		const { xRange } = chart.parameters
		const stepSize = 5
		const newXRange = Utils.decreaseRange(xRange, stepSize)
		dispatch(chartActions.updateParams({ xRange: newXRange }))
	}

	const showNextWords = () => {
		const { xRange } = chart.parameters
		const upperBound = chart.data.all.lyrics.length
		const stepSize = xRange[1] - xRange[0]
		const newXRange = Utils.shiftRange(xRange, stepSize, upperBound)
		dispatch(chartActions.updateParams({ xRange: newXRange }))
	}

	const showPrevWords = () => {
		const { xRange } = chart.parameters
		const stepSize = xRange[1] - xRange[0]
		const newXRange = Utils.unshiftRange(xRange, stepSize)
		dispatch(chartActions.updateParams({ xRange: newXRange }))
	}

	console.log(chart)

	return (
		<div className="Chart">
			<LineChart data={chart.results} />
			<section>
				<div>
					<label>
						A line represents...
						<select
							value={chart.parameters.groupUnits}
							onChange={handleGroupUnitsChange}>
							<option value={T.BY_YEAR}>a year</option>
							<option value={T.BY_ALBUM}>an album</option>
						</select>
					</label>
				</div>
				<div>
					<label>
						Show word frequencies by...
						<select
							value={chart.parameters.yUnits}
							onChange={handleYUnitsChange}>
							<option value={T.FREQ_DISCRETE}>Actual number of uses</option>
							<option value={T.FREQ_PERCENT_GROUP}>
								Relative frequency among words used in this{" "}
								{Utils.getGroupStr(chart.parameters.groupUnits)}
							</option>
							<option value={T.FREQ_PERCENT_GROUP_WORDS}>
								Relative frequency among active words used in this{" "}
								{Utils.getGroupStr(chart.parameters.groupUnits)}
							</option>
						</select>
					</label>
				</div>
				<div className="input-group">
					<label>Adjust X-Axis range</label>
					<div>
						<button className="button" onClick={showFewerWords}>
							-
						</button>
						<button className="button" onClick={showMoreWords}>
							+
						</button>
					</div>
					<div>
						<button className="button" onClick={showPrevWords}>
							Previous
						</button>
						<button className="button" onClick={showNextWords}>
							Next
						</button>
					</div>
				</div>
				<div className="input-group">
					<label>Build a list of words:</label>
					<input type="text" />
				</div>
			</section>
		</div>
	)
}

export default Chart
