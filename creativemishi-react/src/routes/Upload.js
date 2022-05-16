import React from "react"
import Title from '../components/Title'
import DetailsCard from '../components/DetailsCard'
import ShotImg from '../components/ShotImg'
import ShotDetail from '../components/ShotDetail'
import {Link} from "react-router-dom"

class App extends React.Component {

  render(){
    var proyecto = "HXH"
    var capitulo = "152"
    var shot = "1"
    const title = "Upload contribution - Stage 1"  
    return (
      <div className="App">
        <Title title={title}></Title>
        <div className="row">
          <div className="col s8 offset-s2">
            <DetailsCard></DetailsCard> 
          </div>
        </div>
        <div className="row">
            <div className="col s6">
                <ShotImg></ShotImg>
            </div>
            <div className="col s6">
            <Link to={"/project/"+proyecto+"/chapter/"+capitulo+"/shot/"+shot} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Subir contribución</Link>
            </div>
        </div>
        <div className="row">
            <div className="col s6">
                <ShotDetail></ShotDetail>
                <Link to={"/project/"+proyecto+"/chapter/"+capitulo+"/shot/"+shot} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Ver mas</Link>
            </div>
        </div>
      </div>
    )
  }
}

export default App;
