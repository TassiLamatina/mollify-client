// styling for priority color
const prioritySpan = styled.span`
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
render(
  <div>
  </div>
)

export default PrioritySpan