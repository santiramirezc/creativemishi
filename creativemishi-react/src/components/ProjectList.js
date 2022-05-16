import React from "react"
import ProjectCard from './ProjectCard'
import {Link} from "react-router-dom"

class ProjectList extends React.Component {
  render(){
    return (
      <>
      <h4>Proyectos:</h4>
      <ul>
        <div className="row">
          <ProjectCard></ProjectCard>
        </div>
      </ul>
      <Link to="/NewProject" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>New Project</Link>
      </>
    )
  }
}

export default ProjectList;
