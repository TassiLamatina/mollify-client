import LandingPage from './LandingPage.jsx'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect, Link } from 'react-router-dom'

import { useState } from 'react'

export default function Login(props) {

    // state for the controlled from  
    const [email, setEmail, rememberMe] = useState('')
    const [password, setPassword] = useState('')
    // state for flash message from the server
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        try {
          e.preventDefault()
          // console.log('do axios call ! 🚀')
          // post to the backend with axios
          const requestBody = {
            email: email,
            password: password
          }
          // console.log('my server url:', process.env.REACT_APP_SERVER_URL)
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login `, requestBody)
          
          // console.log(response)
          // destructure the response
          const { token } = response.data
          
          // save the response to localstorage
          localStorage.setItem('jwtToken', token)
          localStorage.setItem('rememberMe', 'rememberMe')
          localStorage.setItem('email', rememberMe ? email : '')
    
          // decode the jwt token before we put it in state
          const decoded = jwt.decode(token)
    
          // set the user in App.js's state
          props.setCurrentUser(decoded)
        } catch (err) {
          if(err.response.status === 400) {
            setMessage(err.response.data.msg)
          } else  {
            console.dir(err)
          }
        }
      }
    
      if(props.currentUser) return <Redirect to='/tasks' component={ LandingPage } currentUser={ props.currentUser } />
      // console.log(` hit me with your best shot! ${props}`)

    return(
        <div className="container-fluid"> 
            <div className="row">
                <div className="">
                    <form onSubmit={handleSubmit} id="sign-in">
                        <div className="">
                            <label className="form-label">SIGN IN:</label>
                            <input onChange={e => setEmail(e.target.value) } className="form-control" value={email} type="text" name="username" placeholder="email"/>
                        </div>
                        
                        <div className="">
                            <input id="passwordPad" onChange={e => setPassword(e.target.value) } className="form-control" value={password} type="password" name="password" placeholder="Password"/>
                            <input className="sign-in-submit" type="submit"></input>                 
                        </div>
                    </form>
                    <p className="">{message}</p>
                    <div className="account text-center">
                        <p>Don't have an account?</p>
                        <Link to="/register">
                            <button type="button" id="account-register">Create Account</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}