import React, { useState } from "react"
import {Link} from "react-router-dom"
import {withRouter, Route, useRouteMatch} from 'react-router-dom';

const Header = ({user, setUser, logout}) => {

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "auth/logout", {
      credentials: "include",
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      setUser(null);
      window.localStorage.setItem("logout", Date.now());
    });
  };

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Creative Mishi</Link>
          <ul className="right">
            {user ?
              <>
                <li><Link to="/me/contributions">My contributions</Link></li>
                <li><Link to="/me">Perfil</Link></li>
                <li><a onClick={logoutHandler}>Cerrar sesión</a></li>
              </>
            :
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
            }
          </ul>
        </div>
      </nav>
    </header>      
  )
  
}

export default Header
