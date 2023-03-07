import React, { useCallback, useEffect, useState } from "react"
import { Route, Routes, useNavigate} from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoute'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Project from "./routes/Project"
import Contribute from "./routes/Contribute"
import Contribution from "./routes/Contribution"
import Contributions from "./routes/me/Contributions"
import Part from "./routes/Part"

import Header from './components/Header'
import Footer from './components/Footer'
import Loader from "./components/Loader"


var App = () => {
 
  const [user,setUser] = useState(null)
  const [project,setProject] = useState()
  const [verifyDone, setVerifyDone] = useState(null)

  const navigate = useNavigate()

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "auth/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUser((oldValues) => {
          return { ...oldValues, ...data.user};
        });
        console.log("User despues de refresToken:")
        console.log(user)
      } else {
        setUser(null);
        navigate('/login')
      }
      setVerifyDone(true)
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [])

  const getProject = ({projectId}) => {
    console.log('Getting project')
    fetch(process.env.REACT_APP_API_ENDPOINT + "project/" + projectId, {
      credentials: "include",
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      const {success,project, comment} = await response.json()
      if(success && project){
        setProject(project)
      }else if(success && !project){
        console.log(comment ? comment : "no comment")
        setProject({name:"The project you're looking for doesn't exist"})
        //Redirect user to 404 
      }else{
        console.log("Error getting project :(")
      }
    })
  }

  useEffect(() => {
    if(!user){
      verifyUser()
    }
  },[])

  return (
    <div className="App"> 
      <Header user={user} setUser={setUser}></Header>
      {
        verifyDone ?
        <> 
          <Routes>
            <Route exact path="/" element={ <ProtectedRoute user={user} component={ Home }></ProtectedRoute> }></Route>
            <Route path="/register" element={ <Register setUser={setUser} /> }></Route>
            <Route path="/login" element={ <Login user={user} setUser={setUser} /> }></Route>
            <Route path="/me" element={ <ProtectedRoute user={user} setUser={setUser} component={ Profile }></ProtectedRoute> }></Route>
            <Route path="/me/contributions" element={ <ProtectedRoute component={ Contributions } user={user} level={'user'}  ></ProtectedRoute> }></Route>
            <Route path="/project/:projectId" element={ <Project user={user} setUser={setUser} setProject={setProject} project={project} getProject={getProject} /> }></Route>
            <Route path="/project/:projectId/part/:partId" element={ <Part user={user} setUser={setUser} project={project} getProject={getProject} /> }></Route>
            <Route path="/project/:projectId/contributions" element={ <ProtectedRoute component={ Contributions } user={user} level={'project'} /> }></Route>
            <Route path="/project/:projectId/contribute" element={ <Contribute user={user} setUser={setUser} project={project} getProject={getProject} /> }></Route>
            <Route path="/contribution/:contributionId" element={ <Contribution user={user} setUser={setUser} project={project} getProject={getProject} /> }></Route>
            {/* TODO: Create a 404 route */}
          </Routes>
        </> 
        :
        <Loader/>
      } 
    <Footer></Footer>  
    </div>
  )
}


export default App;
