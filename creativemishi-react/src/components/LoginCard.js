import React, {useState} from "react"
import {Link} from "react-router-dom"
import { Redirect, useLocation } from "react-router-dom";

var LoginCard = (props) => {

  const { state } = useLocation();
  const { from } = state || { from: { pathname: "/" } };
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  if (redirectToReferrer) {
    console.log("Redirigiendo")
    return <Redirect to={from} />;
  }else{
    console.log("Aún no vamos a redirigir")
  }

  var loginUser = (credentials) => {
    return fetch('http://localhost:3000/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  }

  

  const handleSubmit = async e => {
    e.preventDefault()
    const user = await loginUser({
      email,
      password
    })
    if(user){
      console.log("Loggeado!!!")
      console.log(user)
      props.setUser(user)
      setRedirectToReferrer(true)
    }else{
      console.log("No existe el usuario")
    }    
  }

  return (
    <div className="col s10 offset-s1 m4 offset-m2 z-depth-4 card-panel">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <img src="login-logo.png" alt="" className="circle responsive-img valign profile-image-login" />
            <p className="center login-form-text">Material Design Admin Template</p>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix"></i>
            <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="email" className="center-align">email</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix"></i>
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">          
          <div className="input-field col s12 m12 l12  login-text">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button type="submit" className="btn waves-effect waves-light col s12">Log in</button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6 m6 l6">
            <p className="margin medium-small"><a href="page-register.html">Register Now!</a></p>
          </div>
          <div className="input-field col s6 m6 l6">
              <p className="margin right-align medium-small"><a href="page-forgot-password.html">Forgot password ?</a></p>
          </div>          
        </div>

      </form>
    </div>
  )
}

export default LoginCard;
