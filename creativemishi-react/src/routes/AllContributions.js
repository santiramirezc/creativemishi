import React from "react"
import Title from '../components/Title'
import ContributionList from '../components/ContributionList'

class AllConstributions extends React.Component {

  render(){
    const title = "All contributions Stage 1"  
    return (
      <div className="App">
        <Title title={title}></Title>
        <div className="row">
          <div className="col s8 offset-s2">
            <ContributionList></ContributionList>
          </div>
        </div>
      </div>
    )
  }
}

export default AllConstributions;
