import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Loader from "../Loader"
import LineChart from "./LineChart"

function formatForLineChart(options) {
	const { x, y, data, numWords } = options
	const { words, frequenciesByGroup } = data
	const results = words.reduce((acc, word) => {
		const data = Object.entries(frequenciesByGroup).map((entry) => {
			const [group, frequencies] = entry
			const groupFrequency = frequencies[word] || 0
			const point = {
				// Group, e.g. "2016" or "<Album Title>"
				x: group,
				// Frequency of word within group, e.g. 6x in <Year> or 3x on <Album>
				y: groupFrequency,
			}
			return point
		})

		const line = {
			// ID, the word
			id: word,
			// Array of points, each representing frequency (Y-value) for that group/year/album (X-value)
			data: data,
		}

		return [...acc, line]
	}, [])

	return results.slice(0, numWords)
}

const BY_YEAR = "byYear"
const BY_ALBUM = "byAlbum"
const FREQ_TOTAL = "frequencyTotal"
const FREQ_PERCENT = "frequencyPercent"

const getChartData = (options) => {
	console.log("Getting new chart data...")
	const results = formatForLineChart(options)
	console.log(results)
	return results
}

const Chart = () => {
	const { analysis } = useSelector((state) => state)

	const [xUnits, setXUnits] = useState(BY_YEAR)
	const [yUnits, setYUnits] = useState(FREQ_TOTAL)
	const [numWords, setNumWords] = useState(10)

	const [words, setWords] = useState([])
	const [frequencies, setFrequencies] = useState({})

	const [chartData, setChartData] = useState([])

	useEffect(() => {
		console.log("Running effect...")
		const { frequencies } = analysis.all
		const uniqueWords = Object.keys(frequencies)
		if (uniqueWords && uniqueWords !== words) {
			console.log("Setting words...", uniqueWords)
			setWords(uniqueWords)
		}

		const frequenciesByGroup = analysis[xUnits].frequencies
		if (frequenciesByGroup) {
			console.log("Setting frequencies...", frequenciesByGroup)
			setFrequencies(frequenciesByGroup)
		}
	}, [analysis])

	useEffect(() => {
		console.log("Updating chart axis units...")

		const group = xUnits
		const { frequencies } = analysis[group]
		if (frequencies) {
			console.log("Setting frequencies...", frequencies)
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
	}, [xUnits, yUnits])

	const handleXUnitsChange = (e) => {
		setXUnits(event.target.value)
	}

	const handleYUnitsChange = (e) => {
		setYUnits(event.target.value)
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
							<option value={FREQ_TOTAL}>
								Total number of times word was used
							</option>
							<option value={FREQ_PERCENT}>
								Percentage-based number of times word was used
							</option>
						</select>
					</label>
				</div>
			</section>
			{/* {isLoading ? <Loader /> : <LineChart data={data} />} */}
			{/* <TransitionGroup>
				<CSSTransition timeout={300} classNames="fade">
					
				</CSSTransition>
			</TransitionGroup> */}
		</div>
	)
}

export default Chart

// class FlavorForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: 'coconut'};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('Your favorite flavor is: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Pick your favorite flavor:
//           <select value={this.state.value} onChange={this.handleChange}>
//             <option value="grapefruit">Grapefruit</option>
//             <option value="lime">Lime</option>
//             <option value="coconut">Coconut</option>
//             <option value="mango">Mango</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
