import React, { useEffect, useState } from "react"
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'

import Home from './routes/Home'
import Profile from './routes/Profile'
import Project from './routes/Project'
import Chapter from './routes/Chapter'
import Shot from './routes/Shot'
import Stage from './routes/Stage'
import Contributions from './routes/Contributions'
import AllContributions from './routes/AllContributions'
import Upload from './routes/Upload'
import Settings from './routes/Settings'
import ProtectedRoute from './routes/ProtectedRoute'
import Part from './routes/Part'
import Header from './components/Header'
import Footer from './components/Footer'
import Contribute from './components/Contribute'
import Version from './routes/Version'


var App = () => {

  const [project, setProject] = useState({name:false,parts:[]})
  const [user,setUser] = useState({})
  const history = useHistory()
  
  // var setUser = user => {
  //   sessionStorage.setItem('user', JSON.stringify(user));
  //   this.setState({user})
  //   console.log(this.state.user)
  // }

  useEffect(()=>{
    getUser()
  },[])

  const logout = () => {
    fetch('/logout')
      .then( res => res.json())
      .then( data => {
        console.log("YESS")
        setUser({})
      })
      .catch( e => {
        console.log("Error, igual cerrando session")
        setUser({})
      })
  }

  const getUser = () => {
    //Traer los datos del usuario 
    fetch('/app/user')
      .then(res => res.json())
      .then(data => {      
        setUser(data)
        console.log("usuario:") 
        console.log(data)
      })
      .catch((error) =>{
        console.log(error)
        console.log("No se pudo traer el usuario")
        //Se muestra el botón de login
      })
    //Guardar el usuario en localsesion
  }

  const getProject = (projectId) => {
    console.log("Ejecutando getproject")
    fetch('/app/project/'+projectId)
      .then( res => res.json())
      .then( data => {
        console.log("Heey")
        console.log(data)
        if(data){
          setProject(data)
        }
        console.log(project)
      })
      .catch(e => console.log(e))
  }


  return (
    <div className="App"> 
      <Router>
        <Header user={user} setUser={setUser} logout={logout}></Header>
          <Switch>
            <Route exact path="/" >
              <Home></Home>
            </Route>
            <Route path="/user">
              <Profile></Profile>
            </Route>
            <Route exact path="/project/:projectId" >
              <Project user={user} project={project} getProject={getProject}></Project>
            </Route>
            <Route exact path="/project/:projectId/contribute" >
              <Contribute getProject={getProject}></Contribute>
            </Route>
            <Route exact path="/project/:projectId/contributions" >
              <Contributions user={user} project={project} getProject={getProject}></Contributions>
            </Route>
            <Route exact path="/project/:projectId/part/:partId" >
              <Project user={user} project={project} getProject={getProject}></Project>
            </Route>
            <Route exact path="/project/:projectId/part/:partId" >
              <Part user={user} project={project} getProject={getProject}></Part>
            </Route>
            <Route exact path="/project/:projectId/part/:partId/v/:version" >
              <Version user={user} project={project} getProject={getProject}></Version>
            </Route>
            <Route exact path="/project/:projectId/part/:partId/contribute" >
              <Contribute  project={project} getProject={getProject}></Contribute>
            </Route>
          </Switch>
      </Router>   
      <Footer></Footer>   
    </div>
  )
}


export default App;
