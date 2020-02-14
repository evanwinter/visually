import React, { useState } from "react"
import { useSelector } from "react-redux"

import LineChart from "./LineChart"

const Chart = () => {
	const chartState = useSelector((state) => state.chart)
  console.log(chartState)


  const [numX, setNumX] = useState(0)  
  const handleXChange = (e) => {
    console.log(e.currentTarget.value)
  }

	return (
		<div className="Chart">
			<LineChart data={null} />
		</div>
	)
}

export default Chart
