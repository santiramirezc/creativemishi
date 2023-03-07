import { Link } from "react-router-dom"

const ContributionCard = (props) => {
  const { name, description, part, files, _id } = props.contribution
  
  return (
    <div className="col s4">
      <div className="card">
        <div className="card-image">
          <img alt={''} src={files?.finalVersion?.location} />
          <span className="card-title gray-text"><strong>{name}</strong></span>
        </div>
        <div className="card-content">
          <p><strong>Description:</strong>{'  '+ description ? description : 'No description'}</p>
        </div>
        <div className="card-action">
          <Link to={'/contribution/'+_id}>Go to contribution</Link>
        </div>
      </div>
    </div>
  )
}

export default ContributionCard