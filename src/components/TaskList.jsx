import styled from "styled-components";

// styling for priority coloring
const PrioritySpan = styled.div`
background-color: ${props => {
  if(props.priority === "High"){
    return "#6B6C9E"
  }
  else if(props.priority === "Medium"){
     return "#775D83"
  }
     else if(props.priority === "Low"){
     return "#99A1A6"
     }
     else{
       return "white"
     }
     }};
     box-shadow: 0px 12px 0px #FFFFFF;
     border-radius: 200.5381px;
`;

const TaskList = (props) => {
    // render each task from TaskList.js
    const renderedTasks = props.taskData.map(task => {
        return(
            <li key={`${task._id}`}>
                <button id="tasktiles" onClick={() => props.handleTaskCardClick(task)}> 
                <PrioritySpan priority={`${task.priority}`} id="priority">{task.priority}<br></br></PrioritySpan>
                <span id="tileTitle">{task.title} <br></br></span>
                <span id="tileAdded">{task.dateAdded}</span>
                </button>
                <br></br>
                <br></br>
            </li>
        )
    })

    return(
        <div>
            
            <ul className='list'>
                {renderedTasks}
            </ul>
        </div>
    )
}
export default TaskList