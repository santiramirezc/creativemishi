import React from "react"
import Title from './../components/Title'
import ProgressWidget from "../components/ProgressWidget"
import DetailsCard from "../components/DetailsCard"
import Storyboard from "../components/Storyboard"

class App extends React.Component {

  render(){
    const title = "Chapter"  
    console.log(this)
    return(
      <div className="App">
        <Title title={title}></Title>
        <div className="row">
          <div className="col s8 offset-s2">
            <ProgressWidget></ProgressWidget>
          </div>
        </div>
        <div className="row">
          <div className="col s6 ">
            <DetailsCard></DetailsCard>
          </div>
          <div className="col s6">
            <DetailsCard></DetailsCard>
          </div>
        </div>
        <div className="row">
            <Storyboard></Storyboard>
        </div>
      </div>
    )
  }
}

export default App;
