import { memo } from 'react';
import { useDispatch, useSelector } from "react-redux"

const TaskDetails = memo((props) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)

    const { pomodoroType, theme, task } = props;
    const isPomodoroTypeSelected = pomodoroType === "pomodoro";
    const emoji = isPomodoroTypeSelected ? '📌' : '🕺';

    return (<div className="task-container">
        <span>{emoji}</span>
        <span className={`${currentTheme
    ? colors.text[currentTheme].dark
    : "text-purple-800"}`} >
            {isPomodoroTypeSelected ? <> {task ? "Working on" : "Time to focus!"} {task && (<div style={{ fontWeight: 'normal', fontSize: 20 }}>{task}</div>)}</> : "Time for a break!"}
        </span>
    </div >)
});

export default TaskDetails;