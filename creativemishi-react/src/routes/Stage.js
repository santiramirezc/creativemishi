import React from "react"
import Title from './../components/Title'
import DetailsCard from './../components/DetailsCard'
import ContributionList from './../components/ContributionList'
import ShotImg from './../components/ShotImg'
import ArchivesCard from './../components/ArchivesCard'
import HowToHelpWidget from './../components/HowToHelpWidget'

class App extends React.Component {

  render(){
    const title = "Stage 1"  
    return (
      <div className="App">
        <div className="row">
          <Title title={title}></Title>
        </div>

        <div className="row">
          <div className="col s6">
            <ShotImg></ShotImg>
          </div>
          <div className="col s6">
            <ShotImg></ShotImg>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <DetailsCard></DetailsCard>
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            <ArchivesCard></ArchivesCard>
          </div>
          <div className="col s4">
            <HowToHelpWidget></HowToHelpWidget>
          </div>
        </div>
        <div className="row">
          <div className="col s8 offset-s2">
            <ContributionList></ContributionList>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
