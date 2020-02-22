import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useActions } from "hooks"
import Utils from "core/utils"

export const UpdateXRange = () => {
	const dispatch = useDispatch()
	const { chart } = useSelector((state) => state)
	const { chartActions } = useActions()

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

	return (
		<div className="button-group UpdateXRange">
			<button className="button" onClick={showFewerWords}>
				Fewer
			</button>
			<button className="button" onClick={showMoreWords}>
				More
			</button>
		</div>
	)
}

export const ShiftXRange = () => {
	const dispatch = useDispatch()
	const { chart } = useSelector((state) => state)
	const { chartActions } = useActions()

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

	return (
		<div className="button-group ShiftXRange">
			<button className="button" onClick={showPrevWords}>
				Previous
			</button>
			<button className="button" onClick={showNextWords}>
				Next
			</button>
		</div>
	)
}
