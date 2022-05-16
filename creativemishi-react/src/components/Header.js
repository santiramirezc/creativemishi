import React, { useState } from "react"
import {Link} from "react-router-dom"
import {withRouter, Route, useRouteMatch} from 'react-router-dom';

const Header = ({user, logout}) => {

  const host = window.location.origin
  const client_id = "731979084135564"

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Creative git</Link>
          <ul className="right">
            {user?.username ?
              <>
                <li><Link to="/user">Perfil</Link></li>
                <li><a onClick={logout}>Cerrar sesión</a></li>
              </>
            :
            <li><a href={"https://api.instagram.com/oauth/authorize?client_id="+client_id+"&redirect_uri="+host+"/auth/instagram&scope=user_profile,user_media&response_type=code"} >Iniciar sesión</a></li>
            }
          </ul>
        </div>
      </nav>
    </header>      
  )
  
}

export default Header
