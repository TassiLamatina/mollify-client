import { Link } from 'react-router-dom'
import{ Navbar, Col }from 'react-bootstrap'

export default function NavigationBar(props) {
    // if the user is logged in
    const loggedIn = (
        <>
        <Navbar className="navbar navbar-expand-lg ">
            <Col xs={6} md={10}>
                <Navbar.Brand className="container-fluid" id="mollify">Mollify</Navbar.Brand>
            </Col>
            <Col xs={4} md={2} className="user-col">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
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