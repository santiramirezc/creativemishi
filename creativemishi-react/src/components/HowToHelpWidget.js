import React from "react"
import {Link} from "react-router-dom"

class HowToHelpWidget extends React.Component {
  render(){
    return (
      <div>
        <h5 className="center-align">¿Como ayudar?</h5>
        <p>El primer paso consiste en...</p>
        <Link to="/Upload" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Paso 1</Link> <br/> <br/>
        
        <p>El segundo paso consiste en...</p>
        <Link to="/Upload" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Paso 2</Link> <br/> <br/>
        <p>El tercer paso consiste en...</p>
        <Link to="/Upload" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Paso 3</Link> <br/> <br/>
        <p>El cuarto paso consiste en...</p>
        <Link to="/Upload" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Paso 4</Link>
      </div>
    )
  }
}

export default HowToHelpWidget;
