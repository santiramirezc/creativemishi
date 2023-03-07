import { Link } from "react-router-dom"

const PartCard = (props) => {
  
  const {name, description, admins, part, files, version, projectId} = props.part

  return (
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img alt={''} src={files?.finalVersion?.location} />
            <span className="card-title gray-text">
              <strong>Part: {part}</strong>
              {
                version ?
                  <><br/><strong>Version: {version}</strong></>
                  : ""
              }
               <br/>
               {name}
            </span>
          </div>
          <div className="card-content">
            <p><strong>Description:</strong>{'  '+ description ? description : 'No description'}</p>
          </div>
          <div className="card-action">
            <Link to={`/project/${projectId}/part/${part}`}>Go to part</Link>
          </div>
        </div>
      </div>
  )
}

export default PartCard
