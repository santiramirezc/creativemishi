import React from "react"
import {Link} from "react-router-dom"

class StageCard extends React.Component {
  constructor(){
    super()
    this.state = {capitulo: {nombre:"Stage 1",id:"152",stage:"1"},proyecto:"HXH"}
  }
  render(){
    return (
      <div className="col s4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="/office.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">Capitulo 1<i className="material-icons right">more_vert</i></span>
            <p><Link to={"/project/"+this.state.proyecto+"/chapter/"+this.state.capitulo.id+"/shot/"+"1"+"/stage/"+this.state.capitulo.stage}>Ver mas</Link></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Capitulo 1<i className="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default StageCard;
