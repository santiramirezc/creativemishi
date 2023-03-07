import { Link } from "react-router-dom"

const ProjectCard = (props) => {
  
  const {name, description, admins, projectId} = props.project

  return (
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img alt={''} src="/logo192.png" />
            <span className="card-title black-text">{name}</span>
          </div>
          <div className="card-content">
            <p><strong>Description:</strong>{'  '+ description ? description : 'No description'}</p>
          </div>
          <div className="card-action">
            <Link to={'/project/'+projectId}>Go to project</Link>
          </div>
        </div>
      </div>
  )
}

export default ProjectCard
