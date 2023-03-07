import React , {useEffect, useState} from "react"
import { useLocation } from "react-router-dom"
import CardForm from "../components/CardForm"
import ProjectCard from "../components/ProjectCard"

var Profile = ({user, setUser}) => {

  const handleResponse = ({response}) => {
    console.log(response)
    getUser()
  }

  const getUser = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user", {
      credentials: "include",
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      const data = await response.json()
      console.log(response)
      setUser((oldValues) => ({...oldValues, ...data.user}))
    });
  };
    
  return (
    <>
      <h3 className="center" >Profile</h3>
      <div className="container">
        <div className="row">
          <CardForm user={user} title={'Create project'} endpoint={'project/create'} method={'POST'} action={'Create'} onResponse={handleResponse} fields={[
            {name:'Project id', id:'projectId', type:'text'},
            {name:'Project name', id:'name', type:'text'},
            {name:'Description', id:'description', type:'textarea'},
            {name:'Administrators', id:'admins', type:'chips'}
          ]}>
          </CardForm>
          <CardForm user={user} title={'Change password'} endpoint={'auth/password'} method={'PUT'} action={'Change password'} fields={[
            {name:'Old password', id:'oldpassword', type:'text'},
            {name:'New password', id:'newpassword', type:'text'},
            {name:'Confirm password', id:'confirmpassword', type:'text'},
            {name:'username', id:'username', type:'hidden', value: user.username}
          ]}>
          </CardForm>
        </div>

        <div className="row">
          <h4>Your projects:</h4>
        {
          user.projects ?
            user.projects.map((project) => {
              return <ProjectCard project={project}></ProjectCard>
            })
          :
          "You don't have any projects created"
        }
        </div>
      </div>
    </>
  )
  
}

export default Profile;
