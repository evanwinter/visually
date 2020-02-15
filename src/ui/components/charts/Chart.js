import React, { useState } from "react"
import { useSelector } from "react-redux"
import Loader from "../Loader"
import LineChart from "./LineChart"

const Chart = () => {
	const { chart, app } = useSelector((state) => state)

	const { isLoading } = app

  const [numX, setNumX] = useState(0)  
  const handleXChange = (e) => {
    console.log(e.currentTarget.value)
  }

	return (
		<div className="Chart">

			{isLoading ? (
				<Loader />
			) : (
				<LineChart data={null} />
			)}
		</div>
	)
}

export default Chart
