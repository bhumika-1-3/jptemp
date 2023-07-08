import React, { useState, useEffect } from "react"
import "chart.js/auto"
import { Pie } from "react-chartjs-2"

const PieChart = ({ labels, dataSet, colors, loading }) => {
	const [chartData, setChartData] = useState(null)
	// const [chartDataset, setChartDataset] = useState(null)

	// const createDataset = () => {
	// 	const arr = []
	// 	dataSet?.map((item) => {
	// 		return item?.count
	// 	})
	// 	setChartDataset(arr)
	// }

	// console.log("chartData", chartData)
	// console.log("chartDataSet", chartDataset)

	useEffect(() => {
		// if (!chartData) {
		// 	createDataset()
		// }

		// if (chartDataset) {
		const data = {
			labels: labels,
			datasets: [
				{
					data: dataSet?.map((item) => {
						return item?.count
					}),
					backgroundColor: colors,
					borderColor: "transparent",
				},
			],
			hoverOffset: 4,
		}
		setChartData(data)
		// }
	}, [labels, dataSet, colors])

	if (!chartData) {
		return <div>Loading...</div>
	}
	return <Pie data={chartData} />
}

export default PieChart
