import React from "react"
import { Link } from "react-router-dom"

const ProjectCard = (props) => {

    return (
      <div className="col s6 m3">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="office.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{props.name}<i className="material-icons right">more_vert</i></span>
            <p><Link to={"/project/"+props.projectId}>Ver projecto</Link></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Proyecto 1<i className="material-icons right">close</i></span>
            <p>{props.description}</p>
            <p>{props.btn1}</p>
          </div>
        </div>
      </div>
    )
  
}

export default ProjectCard;
