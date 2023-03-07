import React from "react"
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { component:Component, user } = props
  console.log("Accesing protected route")
  //console.log(user)

  return (
    <>
      {user != null ?
        <Component {...props} />
      :
        <Navigate to={{ pathname: "/login" }} />
      }
    </>
  );
};

export default PrivateRoute;