// import React from 'react'
// import { ResponsiveBar } from '@nivo/bar'

// // import theme from './Theme'
// import { SAMPLE_BAR_DATA } from './SampleData'

// const BarChart = ({ data }) => {
// 	return (
// 		<ResponsiveBar
//       data={data || SAMPLE_BAR_DATA}
//       keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
//       indexBy='country'
//       margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//       padding={0.3}
//       colors={{ scheme: 'greens' }}
//       borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'country',
//           legendPosition: 'middle',
//           legendOffset: 32
//       }}
//       axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'food',
//           legendPosition: 'middle',
//           legendOffset: -40
//       }}
//       labelSkipWidth={12}
//       labelSkipHeight={12}
//       labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
//       legends={[
//           {
//               dataFrom: 'keys',
//               anchor: 'bottom-right',
//               direction: 'column',
//               justify: false,
//               translateX: 120,
//               translateY: 0,
//               itemsSpacing: 2,
//               itemWidth: 100,
//               itemHeight: 20,
//               itemDirection: 'left-to-right',
//               itemOpacity: 0.85,
//               symbolSize: 20,
//               effects: [
//                   {
//                       on: 'hover',
//                       style: {
//                           itemOpacity: 1
//                       }
//                   }
//               ]
//           }
//       ]}
//       theme={{
//       	axis: {
//       		domain: {
//       			line: {
//       				stroke: 'white',
//       			},
//       		},
//       		ticks: {
//       			line: {
//       				stroke: 'white',
//       			},
//       			text: {
//       				fill: '#eee',
//       				fontSize: 12,
//       			},
//       		},
//       		legend: {
//       			text: {
//       				fill: '#eee',
//       				fontSize: 12,
//       				fontWeight: 500,
//       			},
//       		},
//       	},
//       	grid: {
//       		line: {
//       			// strokeDasharray: '1 3',
//       			stroke: '#333',
//       		},
//       	},
//       	legends: {
//       		text: {
//       			fontSize: 12,
//       			fill: '#eee',
//       		},
//       	},
//       	tooltip: {
//       		container: {
//       			fontSize: 12,
//       			background: 'black',
//       			color: 'white',
//       		},
//       	},
//       	labels: {
//       		text: {
//       			fill: '#ddd',
//       			fontSize: 12,
//       			fontWeight: 500,
//       			fontFamily: `system-ui, sans-serif`,
//       		},
//       	},
//       	dots: {
//       		text: {
//       			fill: '#bbb',
//       			fontSize: 12,
//       		},
//       	},
//       }}
//       animate={true}
//       motionStiffness={90}
//       motionDamping={15}
//     />
// 	)
// }

// export default BarChart
