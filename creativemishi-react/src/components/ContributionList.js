import React from "react"
import ContributionCard from './ContributionCard'
import {Link} from "react-router-dom"

class ContributionList extends React.Component {
  render(){
    return (
      <>
      <h4>Contributions:</h4>
      <ul>
        <div className="row">
          <ContributionCard></ContributionCard>
          <ContributionCard></ContributionCard>
          <ContributionCard></ContributionCard>
          <ContributionCard></ContributionCard>
        </div>
      </ul>
      <Link to="/project/HXH/chapter/152/shot/1/stage/1/upload" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Nuevo aporte</Link>
      <Link to="/project/HXH/chapter/152/shot/1/stage/1/contribution" className="waves-effect waves-light btn yellow"><i className="material-icons left">cloud</i>Todos los aportes</Link>
      </>
    )
  }
}

export default ContributionList;