import React from "react"
import { ResponsiveLine } from "@nivo/line"

import theme from "./Theme"
import { SAMPLE_LINE_DATA, SAMPLE_DATA_LAURA_LES } from "./SampleData"

const LineChart = ({ options, data }) => {
	const { xMin, xMax, xAxisLegend, yMin, yMax, yAxisLegend } = options

	return (
		<ResponsiveLine
			data={data || SAMPLE_LINE_DATA}
			margin={{ top: 50, right: 50, bottom: 70, left: 70 }}
			xScale={{ type: "point" }}
			yScale={{ type: "linear", stacked: false, min: yMin, max: yMax }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: "bottom",
				tickSize: 5,
				tickPadding: 10,
				tickRotation: 30,
				legend: xAxisLegend,
				legendOffset: 60,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickSize: 5,
				tickPadding: 10,
				tickRotation: 0,
				legend: yAxisLegend,
				legendOffset: -60,
				legendPosition: "middle",
			}}
			colors={{ scheme: "category10" }}
			pointSize={5}
			pointColor={{ from: "color", modifiers: [] }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabel="y"
			pointLabelYOffset={-12}
			areaOpacity={0.4}
			enableCrosshair={true}
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
							fontSize: 16,
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
				labels: {
					text: {
						fill: "#ddd",
						fontSize: 12,
						fontWeight: 500,
						fontFamily: `'IBM Plex Mono', 'Space Grotesk', 'Roboto Slab', sans-serif`,
					},
				},
				dots: {
					text: {
						fill: "#bbb",
						fontSize: 12,
					},
				},
			}}
			legends={[
				{
					anchor: "top-right",
					direction: "column",
					justify: false,
					translateX: 0,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemHeight: 20,
					itemWidth: 200,
					itemOpacity: 0.8,
					itemTextColor: "#eee",
					itemBackground: "#111",
					symbolSize: 12,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, .5)",
					effects: [
						{
							on: "hover",
							style: {
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
