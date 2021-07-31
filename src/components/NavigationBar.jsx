import { Link } from 'react-router-dom'
import{ Navbar, Col }from 'react-bootstrap'
import styled from "styled-components";

const TitleComponent = styled.h1`
padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Fira Code', monospace;
  width: 100%;
  height: 100%;
  font-size: 16px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  display: inline-block;
  font-size: 3rem;
  background: linear-gradient(to bottom, #000, #000 60%, #fff 60%, #fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-repeat: no-repeat;
  transition: background 0.2s ease-out;
  white-space: nowrap;
  position: relative;

span:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 15px;
  background: #000;
  bottom: 9px;
  transition: all 0.2s ease-out;
}

p:hover {
  background-position: 0 11px;
}

span:hover:before {
  transform: translateY(10px)
}
`;

export default function NavigationBar(props) {
    // if the user is logged in
    const loggedIn = (
        <>
        <Navbar className="navbar navbar-expand-lg ">
            <Col xs={6} md={10}>
                <TitleComponent className="container-fluid" id="mollify"><p>Mollify</p></TitleComponent>
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