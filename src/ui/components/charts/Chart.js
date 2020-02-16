import React, { useState } from "react"
import { useSelector } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Loader from "../Loader"
import LineChart from "./LineChart"

const Chart = () => {
	const { chart, app } = useSelector((state) => state)
	const { isLoading } = app

	return (
		<div className="Chart">
			<TransitionGroup>
				<CSSTransition timeout={300} classNames="fade">
					{isLoading ? <Loader /> : <LineChart data={null} />}
				</CSSTransition>
			</TransitionGroup>
		</div>
	)
}

export default Chart
