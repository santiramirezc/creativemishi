import React from "react"
import Title from '../components/Title'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShotImg from '../components/ShotImg'
import ShotDetail from '../components/ShotDetail'
import {Link} from "react-router-dom"
import StageList from "../components/StageList"

class App extends React.Component {

  render(){
    var proyecto = "HXH"
    var capitulo = "152"
    var shot = "1"
    const title = "Shot"  
    return (
      <div className="App">
        <Title title={title}></Title>

        <div className="row">
          <div className="col s12">
              <ShotImg></ShotImg>
          </div>
        </div>
        <div className="row">
          <div className="col s8 offset-s2">
              <ShotDetail></ShotDetail>
              <Link to={"/project/"+proyecto+"/chapter/"+capitulo+"/shot/"+shot} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Ver mas</Link>
          </div>
        </div>

        <div className="row">
          <div className="col s8 offset-s2">
            <StageList></StageList>
          </div>
        </div>  
      </div>
    )
  }
}

export default App;
