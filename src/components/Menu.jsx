import { Nav } from 'react-bootstrap'

export default function Menu(props) {
    // set which link is selected 
    let key
    if (props.filter === null) {
        key = 'show-all'
    } else if (props.filter === 'Incomplete') {
        key = 'incomplete'
    } else if (props.filter === 'Complete') {
        key = 'complete'
    } 

    return(
        <div id= "menubar1">
            <div className='menuTitle'>
                <h2>To-Do:</h2>
            </div>
            <div id="taskFilterBtn">
                <Nav activeKey={key} className='flex-column'>
                    <Nav.Link eventKey='show-all' onClick={e => props.handleMenuClick(null)}>Show All</Nav.Link>
                    <Nav.Link eventKey='incomplete' onClick={e => props.handleMenuClick('Incomplete')}>Incomplete</Nav.Link>
                    <Nav.Link eventKey='complete' onClick={e => props.handleMenuClick('Complete')}>Done</Nav.Link>
                </Nav>
            </div>
        </div>
    )
}