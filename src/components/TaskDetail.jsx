import { Button } from "react-bootstrap"

 const TaskDetail = (props) => {
    return(
        <div className="detailBox">
            <div className="header">
                <h2>Title: {props.task.title}</h2>
            </div>
            <div className="desc pb-3">
                <small>{props.task.description}</small>
                <br></br>
                <strong>Notes: </strong><small>{props.task.notes}</small>
                <br></br>
                <strong>Date Added: {props.task.dateAdded}</strong>
                <br></br>
                Priority: {props.task.priority}
                <br></br>
            </div>
            <Button className="updateCardBtn" onClick={() => props.showUpdateTaskForm(props.task) }>Update Task</Button>
        </div>
    )
}
export default TaskDetail