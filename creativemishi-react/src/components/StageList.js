import React from "react"
import StageCard from "./StageCard"

class StageList extends React.Component {
  render(){
    return (
      <div>
        <h2>Etapas:</h2>
        <StageCard></StageCard>
        <StageCard></StageCard>
      </div>
    )
  }
}

export default StageList;
