import React, { useState, useEffect, useReducer } from "react"
import { useSelector } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Loader from "../Loader"
import LineChart from "./LineChart"
import Utils from "core/utils"
import T from "types"

function formatForLineChart(options) {
	// const lines = getWordLines(words, frequencies)
	const lines = Utils.getGroupLines(options)
	return lines
}

const Chart = () => {
	const { analysis } = useSelector((state) => state)

	const [state, dispatch] = useReducer(menuReducer, initialState)

	const [_lineUnits, setLineUnits] = useState(BY_YEAR)
	const lineUnitsStr = _lineUnits.substr(2, _lineUnits.length).toLowerCase()
	const [_yUnits, setYUnits] = useState(FREQ_DISCRETE)
	const [_xRange, setXRange] = useState(DEFAULT_X_RANGE)
	const [_sortBy, setSortBy] = useState(DEFAULT_SORT_BY)
	const [_allWords, setAllWords] = useState([])
	const [_allFrequencies, setAllFrequencies] = useState({})
	const [_groupedFrequencies, setGroupedFrequencies] = useState({})
	const [_sortedFrequencies, setSortedFrequencies] = useState([])
	const [_chartData, setChartData] = useState([])

	// On discography data arrival, hydrate state
	useEffect(() => {
		const allFrequencies = analysis.all.frequencies
		const allWords = analysis.all.words
		const groupedFrequencies = analysis[_lineUnits].frequencies

		if (allFrequencies) {
			setAllFrequencies(allFrequencies)
		}

		if (groupedFrequencies) {
			setGroupedFrequencies(groupedFrequencies)
		}

		if (allFrequencies) {
			setSortedFrequencies(Utils.getSortedFrequencies(allFrequencies))
		}

		if (allWords) {
			setAllWords(allWords)
		}
	}, [analysis])

	// Update chart data when inputs change
	useEffect(() => {
		const input = {
			parameters: {
				lineUnit: _lineUnits,
				xUnits: "",
				yUnits: _yUnits,
				xRange: _xRange,
				yRange: [],
				sortBy: _sortBy
			},
			data: {
				words: _allWords,
				allFrequencies: _allFrequencies,
				groupedFrequencies: _groupedFrequencies,
				sortedFrequencies: _sortedFrequencies,
			},
		}

		const output = getChartData(input)

		setChartData(output)
	}, [_lineUnits, _yUnits, _sortBy, _xRange])

	const getChartData = (options) => {
		const results = formatForLineChart(options)
		return results
	}

	const handleLineUnitsChange = (e) => setLineUnits(e.target.value)
	const handleYUnitsChange = (e) => setYUnits(e.target.value)

	const showMoreWords = () => {
		const [xMin, xMax] = _xRange
		const outOfBounds = xMax + 5 > _allWords.length
		const newXMax = outOfBounds ? _allWords.length : xMax + 5
		const newXRange = [xMin, newXMax]
		setXRange(newXRange)
	}

	const showFewerWords = () => {
		const [xMin, xMax] = _xRange
		const outOfBounds = xMin - 5 < 0
		const newXMin = outOfBounds ? xMin : xMin - 5
		const newXRange = [newXMin, xMax]
		setXRange(newXRange)
	}

	const showNextWords = () => {
		const [xMin, xMax] = _xRange
		const outOfBounds = xMax + 5 > _allWords.length
		const newXRange = outOfBounds ? _xRange : _xRange.map((val) => (val += 5))
		setXRange(newXRange)
	}

	const showPrevWords = () => {
		const [xMin, xMax] = _xRange
		const outOfBounds = xMin - 5 < 0
		const newXRange = outOfBounds ? _xRange : _xRange.map((val) => (val -= 5))
		setXRange(newXRange)
	}

	return (
		<div className="Chart">
			<LineChart data={_chartData} />
			<section>
				<div>
					<label>
						A line represents...
						<select value={_lineUnits} onChange={handleLineUnitsChange}>
							<option value={BY_YEAR}>a year</option>
							<option value={BY_ALBUM}>an album</option>
						</select>
					</label>
				</div>
				<div>
					<label>
						Show word frequencies by...
						<select value={_yUnits} onChange={handleYUnitsChange}>
							<option value={FREQ_DISCRETE}>Actual number of uses</option>
							<option value={FREQ_PERCENT_GROUP}>
								Relative frequency among words used in this {lineUnitsStr}
							</option>
							<option value={FREQ_PERCENT_GROUP_allWords}>
								Relative frequency among active words used in this{" "}
								{lineUnitsStr}
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
