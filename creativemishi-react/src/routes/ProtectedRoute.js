import React, {useState} from "react"
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ getUser,component: Component}) => {
  const location = useLocation();
  var user = getUser()
  console.log(useState())

  console.log("Esto es ruta protegida, user:")
  console.log(user)
  return (
    <Route>
      {user != null ?
        <Component />
      :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default PrivateRoute;