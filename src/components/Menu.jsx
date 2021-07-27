import { Nav } from 'react-bootstrap'

export default function Menu(props) {
    // set which link is selected 
    console.log(props)
    let key
    if (props.filter === null) {
        key = 'show-all'
    } else if (props.filter === 'Incomplete') {
        key = 'Incomplete'
    } else if (props.filter === 'Complete') {
        key = 'Complete'
    } 

    return(
        <div id= "menubar1">
            <div className='menuTitle'>
                <h2>To-Do:</h2>
            </div>
            <div id="taskFilterBtn">
                <Nav activeKey={key} className='flex-column'>
                    <Nav.Link eventKey='show-all' onClick={e => props.handleMenuClick(null)}>Show All</Nav.Link>
                    <Nav.Link eventKey='Incomplete' onClick={e => props.handleMenuClick('Incomplete')}>Incomplete</Nav.Link>
                    <Nav.Link eventKey='Complete' onClick={e => props.handleMenuClick('Complete')}>Complete</Nav.Link>
                </Nav>
            </div>
        </div>
    )
}