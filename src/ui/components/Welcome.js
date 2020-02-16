import React from "react"
import Search from "./Search"
import { useSelector } from "react-redux"

const Welcome = () => {
	const { app, analysis } = useSelector((state) => state)
	const { isLoading } = app

	const hasData = analysis.all.lyrics.length > 0
	const hasRunOnce = isLoading || hasData

	return (
		<div className="Welcome" data-show={!hasRunOnce}>
			<div className="container">
				<h1>Visually</h1>
				<p>Statistical analysis and visualization of song lyrics.</p>

				<Search />
			</div>
		</div>
	)
}

export default Welcome
