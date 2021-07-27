import './App.css';
import NavigationBar from './components/Navbar.jsx'
import NewAccount from './components/NewAccount.jsx'
import LandingPage from './components/LandingPage.jsx'
import Login from './components/Login.jsx'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import {
  useState,
  useEffect
} from 'react'

import jwt from 'jsonwebtoken'

function App() {
  // state holds user data if the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  // if navigates away automatically log them in (if the jwt is valid)
  useEffect(() => {
    // get the token from local storage
    const token = localStorage.getItem('jwtToken')
    // if check for token
    if(token) {
      setCurrentUser(jwt.decode(token))
      // else set the user in state to be null
    } else{
      setCurrentUser(null)
    }
    
  }, [])

  // function to log the user out
  const handleLogout = () => {
    // delete the jwt thats in local storage
    if(localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
      // set the user in state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        <NavigationBar  currentUser={ currentUser } handleLogout={ handleLogout }/>
      </header>

      <div className="App">
        <Switch>
          <Route 
            exact path="/"
            render={ props => <Login {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser }/> }
          />

          <Route 
            path="/register"
            render={ props => <NewAccount {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser }/> }
          />

          {/* conditionally render a redirect for auth locked routes */}
          <Route 
            path="/tasks"
            render={ props => currentUser ? <LandingPage {...props} currentUser={ currentUser } handleLogout={ handleLogout }/> : <Redirect to="/" />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;