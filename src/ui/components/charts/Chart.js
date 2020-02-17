import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Loader from "../Loader"
import LineChart from "./LineChart"

const BY_YEAR = "byYear"
const BY_ALBUM = "byAlbum"
const FREQ_DISCRETE = "frequencyDiscrete"
const FREQ_PERCENT_TOTAL = "frequencyPercentTotal"
const FREQ_PERCENT_GROUP = "frequencyPercentGroup"
const FREQ_PERCENT_GROUP_WORDS = "frequencyPercentGroupWords"

function formatForLineChart(options) {
	const { x, y, data, numWords } = options
	const { words, frequencies } = data

	const getGroupLines = (words, groupedFrequencies) => {
		// lines will be an array of line objects, each line representing a group (album or year)
		const groups = Object.entries(groupedFrequencies)
		const lines = groups.reduce((acc, entry) => {
			const [group, groupFrequencies] = entry

			const targetWords = words.slice(0, numWords)
			const targetFrequencies = Object.entries(groupFrequencies).reduce((acc, curr) => {
				const [word, frequency] = curr
				if (targetWords.includes(word)) {
					acc[word] = frequency
				}
				return acc
			}, {})

			const data = targetWords.map((word) => {
				const wordFrequencyInGroup = targetFrequencies[word] || 0

				// Divides a number by the sum of all values in an object
				const getPercent = (count, obj) => {
					// Get total number of lyrics used
					const summedValues = Object.values(obj).reduce(
						(acc, count) => acc + count,
					)
					// Get percent of those lyrics that are this iteration's target lyric
					const decimal = count / summedValues
					const percent = (decimal * 100).toFixed(2)
					return percent
				}

				let yVal = ""
				if (y === FREQ_PERCENT_GROUP) {
					yVal = getPercent(wordFrequencyInGroup, groupFrequencies)
				} else if (y === FREQ_PERCENT_GROUP_WORDS) {
					yVal = getPercent(wordFrequencyInGroup, targetFrequencies)
				} else if (y === FREQ_DISCRETE) {
					yVal = wordFrequencyInGroup
				}

				const point = {
					x: word,
					y: yVal,
				}

				return point
			})

			// init line object
			const line = {
				id: group,
				data: data,
			}

			// Add line object to array of line objects
			return [...acc, line]
		}, [])

		return lines
	}

	// const results = words.reduce((acc, word) => {
	// 	const data = Object.entries(frequencies).map((entry) => {
	// 		const [group, frequencies] = entry
	// 		const groupFrequency = frequencies[word] || 0
	// 		const point = {
	// 			// Group, e.g. "2016" or "<Album Title>"
	// 			x: group,
	// 			// Frequency of word within group, e.g. 6x in <Year> or 3x on <Album>
	// 			y: groupFrequency,
	// 		}
	// 		return point
	// 	})

	// 	const line = {
	// 		// ID, the word
	// 		id: word,
	// 		// Array of points, each representing frequency (Y-value) for that group/year/album (X-value)
	// 		data: data,
	// 	}

	// 	return [...acc, line]
	// }, [])

	const lines = getGroupLines(words, frequencies)

	return lines
}

const getChartData = (options) => {
	console.log("Getting new chart data...")
	const results = formatForLineChart(options)
	console.log(results)
	return results
}

const Chart = () => {
	const { analysis } = useSelector((state) => state)

	const [xUnits, setXUnits] = useState(BY_YEAR)
	const [yUnits, setYUnits] = useState(FREQ_DISCRETE)
	const [numWords, setNumWords] = useState(10)

	const [words, setWords] = useState([])
	const [frequencies, setFrequencies] = useState({})

	const [chartData, setChartData] = useState([])

	useEffect(() => {
		const { frequencies } = analysis.all
		const uniqueWords = Object.keys(frequencies)
		if (uniqueWords && uniqueWords !== words) {
			setWords(uniqueWords)
		}

		const frequenciesByGroup = analysis[xUnits].frequencies
		if (frequenciesByGroup) {
			setFrequencies(frequenciesByGroup)
		}
	}, [analysis])

	useEffect(() => {
		const group = xUnits
		const { frequencies } = analysis[group]
		if (frequencies) {
			setFrequencies(frequencies)
		}

		const input = {
			x: xUnits,
			y: yUnits,
			numWords: numWords,
			data: {
				words: words,
				frequencies: frequencies,
			},
		}

		const output = getChartData(input)

		setChartData(output)
	}, [xUnits, yUnits, numWords])

	const handleXUnitsChange = (e) => {
		setXUnits(e.target.value)
	}

	const handleYUnitsChange = (e) => {
		setYUnits(e.target.value)
	}

	const handleNumWordsChange = (e) => {
		setNumWords(e.target.value)
	}

	const showMoreWords = (e) => {
		setNumWords(numWords + 5)
	}

	const showFewerWords = (e) => {
		const fewer = numWords - 5 > 0 ? numWords - 5 : 1
		setNumWords(fewer)
	}

	return (
		<div className="Chart">
			<LineChart data={chartData} />
			<section>
				<div>
					<label>
						X Axis Units
						<select value={xUnits} onChange={handleXUnitsChange}>
							<option value={BY_YEAR}>By Year</option>
							<option value={BY_ALBUM}>By Album</option>
						</select>
					</label>
				</div>
				<div>
					<label>
						Y Axis Units
						<select value={yUnits} onChange={handleYUnitsChange}>
							<option value={FREQ_DISCRETE}>
								Total number of times word was used
							</option>
							<option value={FREQ_PERCENT_GROUP}>
								Percentage-based number of times word was used within this group
							</option>
							<option value={FREQ_PERCENT_GROUP_WORDS}>
								Percentage-based number of times word was used within the words currently displayed in the x-axis
							</option>
						</select>
					</label>
				</div>
			</section>
			<div className="input-group">
				<label>Number of words</label>
				<button onClick={showFewerWords}>-</button>
				<button onClick={showMoreWords}>+</button>
			</div>
		</div>
	)
}

export default Chart
