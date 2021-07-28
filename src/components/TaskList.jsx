import styled from "styled-components";

// styling for priority coloring
const PrioritySpan = styled.div`
background-color: ${props => {
  if(props.priority === "High"){
    return "#5c5c82"
  }
  else if(props.priority === "Medium"){
     return "#775D83"
  }
     else if(props.priority === "Low"){
     return "#5c7082"
     }
     else{
       return "#F3F5EF"
     }
     }};
     box-shadow: 0px 12px 0px #F3F5EF;
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