// styling for priority color
const prioritySpan = styled.span`
  background-color: ${props => {
    if(props.priority === "high"){
      return "red"
    }
    else if(props.priority === "medium"){
       return "yellow"
    }
       else if(props.priority === "low"){
       return "green"
       }
       else{
         return "white"
       }
       }};
`;
render(
  <div>
  </div>
)

export default PrioritySpan