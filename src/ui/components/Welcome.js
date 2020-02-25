import React from "react"
import Search from "./Search"
import { useSelector } from "react-redux"
import T from "types"
import UseSampleData from "./UseSampleData"

const Welcome = () => {
	const { app, analysis } = useSelector((state) => state)
	const { step } = app

	const hasData = analysis.all.lyrics.length > 0
	const hasRunOnce = step === T.STEP_LOADING || hasData

	return (
		<div className="Welcome" data-show={!hasRunOnce}>
			<div className="container">
				<h2 className="large-heading">Welcome to Visually.</h2>
				<p>Basic statistical analysis and data visualization of song lyrics.</p>

				<Search />

				<p>or...</p>

				<UseSampleData />
			</div>
		</div>
	)
}

export default Welcome
