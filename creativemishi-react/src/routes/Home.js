import React , {useEffect, useState} from "react"
import { useLocation } from "react-router-dom"
import Title from './../components/Title'
import ProjectCard from './../components/ProjectCard'

var Home = () => {

  const [user,setUser] = useState({})
  const [projects,setProjects] = useState([{}])
  const host = window.location.href
  
  useEffect(() => {
    getProjects()
  },[])

  const getProjects = () => {
    //Traer los datos del usuario 
    fetch('/app/projects')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProjects(data)        
      })
      .catch((error) =>{
        alert("No se pudo traer los proyectos")
      })
  }
    
  return (
    <div className="App">
      <h3 className="center" > Proyectos</h3>
      <div className="row">
        <div className="col s12">
          {
            projects.map((project,index) => {
              return <ProjectCard name={project.name} description={project.description} projectId={project.projectId}></ProjectCard>
            })
          }
        </div>
      </div>
    </div>
  )
  
}

export default Home;
