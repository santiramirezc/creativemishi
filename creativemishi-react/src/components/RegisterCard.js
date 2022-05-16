import React from "react"
import {Link} from "react-router-dom"

var RegisterCard = () => {
    return (
    <div className="col s10 offset-s1 m4 offset-m1 z-depth-4 card-panel">
      <form className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <h4>Register</h4>
            <p className="center">Join to our community now !</p>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-social-person-outline prefix"></i>
            <input id="username" type="text" />
            <label htmlFor="username" className="center-align">Username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-communication-email prefix"></i>
            <input id="emaill" type="email" />
            <label htmlFor="email" className="center-align">Email</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix"></i>
            <input id="passwordl" type="password" />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="mdi-action-lock-outline prefix"></i>
            <input id="password-again" type="password" />
            <label htmlFor="password-again">Password again</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <a href="index.html" className="btn waves-effect waves-light col s12">Register Now</a>
          </div>
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up">Already have an account? <a href="page-login.html">Login</a></p>
          </div>
        </div>
      </form>
    </div>
    )
}

export default RegisterCard;
