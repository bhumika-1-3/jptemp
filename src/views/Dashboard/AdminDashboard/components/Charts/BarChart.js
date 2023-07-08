import React, { useState, useEffect } from "react"
import "chart.js/auto"
import { Bar } from "react-chartjs-2"

const labels = ["Frontend","backend","Blockchain","DA","ML","AI","CN","UI/UX","others"]
const BarChart = ({ label, dataSet, colors }) => {
	const [chartData, setChartData] = useState(null)
	useEffect(() => {
		const data = {
			labels: labels,
			datasets: [
				{
					label: "Domains",
					data: dataSet?.map((item) => {
						return item?.count
					}),
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(255, 159, 64, 0.2)",
						"rgba(255, 205, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(201, 203, 207, 0.2)",
					],
					borderColor: [
						"rgb(255, 99, 132)",
						"rgb(255, 159, 64)",
						"rgb(255, 205, 86)",
						"rgb(75, 192, 192)",
						"rgb(54, 162, 235)",
						"rgb(153, 102, 255)",
						"rgb(201, 203, 207)",
					],
					borderWidth: 1,
				},
			],
			hoverOffset: 4,
		}
		setChartData(data)
	}, [labels, dataSet, colors])

	if (!chartData) {
		return <div>Loading...</div>
	}
	return <Bar data={chartData} />
}

export default BarChart
