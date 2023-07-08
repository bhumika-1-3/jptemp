import { useState, useEffect, useCallback } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)
const content = [{ "date": "2023-02-02", "present": 24, "absent": false }, { "date": "2023-01-02", "present": 12, "absent": false }, { "date": "2023-02-03", "present": 2, "absent": true }, { "date": "2023-01-24", "present": 34, "absent": true }, { "date": "2023-02-05", "present": 2, "absent": true }, { "date": "2023-02-06", "present": 25, "absent": false }, { "date": "2023-01-07", "present": 25, "absent": false }, { "date": "2023-01-08", "present": 25, "absent": false }, { "date": "2023-01-18", "present": 2, "absent": true }, { "date": "2023-01-16", "present": 54, "absent": true },
{ "date": "2023-02-16", "future": true }, { "date": "2023-02-11", "future": true }, { "date": "2023-02-7", "future": true }]

const MyCalendar = ({ con, onClick }) => {

	const [list, setList] = useState([])
	// console.log(JSON.stringify(content));
	const getAbsent = useCallback(() => {
		const absentList = []
		if (content) {
			content?.forEach((item, idx) => {
				let color = "#f43f5e"
				// let start = moment(item.date).toDate()
				let start = item.date;
				if (item.absent == true)
					absentList.push({
						id: idx,
						title: `Absent`,
						start: start,
						end: start,
						color: color,
						allDay: "true",
					})
			})
		}
		return absentList
	}, [content])

	const getPresent = useCallback(() => {
		const presentList = []
		if (content) {
			content?.forEach((item, idx) => {
				// let start = moment(item.date).toDate()
				let start = item.date
				if (item.absent == false)
					presentList.push({
						id: idx,
						title: `Score: ${item.present}`,
						start: start,
						end: start,
						color: "#4ade80",
						allDay: "true",
					})
			})
		}
		return presentList
	}, [content])
	const getFuture = useCallback(() => {
		const futureList = []
		if (content) {
			content?.forEach((item, idx) => {
				// let start = moment(item.date).toDate()
				let start = item.date
				if (item.future)
					futureList.push({
						id: idx,
						title: `upcoming`,
						start: start,
						end: start,
						color: "#0284c7",
						allDay: "true",
					})
			})
		}
		return futureList
	}, [content])

	useEffect(() => {
		const data1 = getAbsent()
		const data2 = getPresent()
		const data3 = getFuture()
		setList([...data1, ...data2, ...data3])
	}, [getAbsent, getPresent,getFuture])
	return (
		<center>

			<Calendar
				localizer={localizer}
				events={list}
				startAccessor="start"
				endAccessor="end"
				onSelectEvent={(e) => onClick(e.start || e.end)}
				eventPropGetter={(event) => {
					const eventData = list.find((ot) => ot.title === event.title)
					const backgroundColor = eventData && eventData.color
					return {
						style: {
							backgroundColor,
							borderRadius: "30px",
							maxWidth: "fit-content",
							display: "inline-block",
							marginLeft: "10px",
							padding:"3%"
						},
					}
				}}
				style={{ backgroundColor: "", height: "600px" }}
			/>
		</center>

	)
}

export default MyCalendar
