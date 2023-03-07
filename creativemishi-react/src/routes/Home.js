import React , {useEffect, useState} from "react"
import { useLocation } from "react-router-dom"

import ProjectCard from "../components/ProjectCard"

var Home = (props) => {
  const { user } = props

  const [projects, setProjects] = useState()

  useEffect(() => {
    if(!projects){
      getAllProjects()
    }
  },[])

  const getAllProjects = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "project", {
      credentials: "include",
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      const {success, data, comment} = await response.json()
      if(success && data){
        setProjects(data)
      }
      if(success && !data){
        console.log("No data :/")
      }
      if(!success && comment){
        console.log(comment)
      }else{
        console.log("EEEERRRROR")
      }
    })
  }
    
  return (
    <div className="App">
      <h3 className="center" > Bienvenido a Creative Mishi</h3>
      <div className="row">
        <div className="col s12">
          {
            projects?.length > 0 ?
              projects.map((project) => {
                return <ProjectCard project={project} />
              })
            :
            "No projects"
          }
        </div>
      </div>
    </div>
  )
  
}

export default Home;
