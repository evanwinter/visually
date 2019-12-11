import React from "react"
import { useSelector } from "react-redux"

import LineChart from "./LineChart"

const Chart = () => {
	const chartState = useSelector((state) => state.chart)
	console.log(chartState)

	return (
		<div className="Chart">
			<LineChart data={null} />
		</div>
	)
}

export default Chart
