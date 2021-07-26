import { Link } from 'react-router-dom'
import{ Navbar, Col }from 'react-bootstrap'

export default function Navbar(props) {
    // if the user is logged in
    const loggedIn = (
        <>
        <Navbar expand="lg">
            <Col xs={6} md={10}>
                <Navbar.Brand id="mollify">Mollify</Navbar.Brand>
            </Col>
            <Col xs={4} md={2} className="user-col">
                <div className="user">              
                    <p>Hi {props.currentUser ? props.currentUser.name : ""}!</p>
                </div>
                <div className="icon"> 
                    <img className="img-fluid" src="https://img.icons8.com/material-outlined/48/000000/user-male-circle.png" alt="person-icon"/>
                </div>
                <div className="logout">
                    <Link to="/">
                        <span onClick={props.handleLogout}>Logout</span>
                    </Link>
                </div> 
            </Col>
        </Navbar>  
    </>
    )
    // if the user is logged out
    const loggedOut = (
        <>
            
        </>
    )
    return(
        <nav>
            {props.currentUser ? loggedIn : loggedOut}
        </nav>
    )
}