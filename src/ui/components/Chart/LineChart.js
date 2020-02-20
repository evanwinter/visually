import React from "react"
import { ResponsiveLine } from "@nivo/line"

import theme from "./Theme"
import { SAMPLE_LINE_DATA, SAMPLE_DATA_LAURA_LES } from "./SampleData"

const LineChart = ({ data }) => {
	return (
		<ResponsiveLine
			data={data || SAMPLE_LINE_DATA}
			margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
			xScale={{ type: "point" }}
			yScale={{ type: "linear", stacked: true, min: "auto", max: "auto" }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: "bottom",
				tickSize: 5,
				tickPadding: 10,
				tickRotation: 30,
				legend: "transportation",
				legendOffset: 60,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickSize: 5,
				tickPadding: 10,
				tickRotation: 0,
				legend: "count",
				legendOffset: -60,
				legendPosition: "middle",
			}}
			colors={{ scheme: "nivo" }}
			pointSize={5}
			pointColor={{ from: "color", modifiers: [] }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabel="y"
			pointLabelYOffset={-12}
			areaOpacity={0.4}
			enableCrosshair={false}
			useMesh={true}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: "white",
						},
					},
					ticks: {
						line: {
							stroke: "white",
						},
						text: {
							fill: "#eee",
							fontSize: 12,
						},
					},
					legend: {
						text: {
							fill: "#eee",
							fontSize: 12,
							fontWeight: 500,
						},
					},
				},
				grid: {
					line: {
						// strokeDasharray: '1 3',
						stroke: "#333",
					},
				},
				legends: {
					text: {
						fontSize: 12,
						fill: "#eee",
					},
				},
				tooltip: {
					container: {
						fontSize: 12,
						background: "black",
						color: "white",
					},
				},
				// labels: {
				// 	text: {
				// 		fill: '#ddd',
				// 		fontSize: 12,
				// 		fontWeight: 500,
				// 		fontFamily: `'IBM Plex Mono', 'Space Grotesk', 'Roboto Slab', sans-serif`,
				// 	},
				// },
				// dots: {
				// 	text: {
				// 		fill: '#bbb',
				// 		fontSize: 12,
				// 	},
				// },
			}}
			legends={[
				{
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 0,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					itemTextColor: "#eee",
					symbolSize: 12,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, .5)",
					effects: [
						{
							on: "hover",
							style: {
								itemBackground: "rgba(0, 0, 0, .03)",
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	)
}

export default LineChart
