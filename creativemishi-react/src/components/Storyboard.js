import React from "react"
import ShotImg from './ShotImg'
import ShotDetail from './ShotDetail'
import {Link} from "react-router-dom"
import "materialize-css/dist/css/materialize.min.css"
import M from "materialize-css";

class StoryBoard extends React.Component {

    componentDidMount(){
        var el = document.querySelector('.tabs');
        M.Tabs.init(el, {});
        var elems = document.querySelectorAll('.slider');
        M.Slider.init(elems, {});
    }

  render(){
      var proyecto = "HXH"
      var capitulo = "152"
      var shot = "1"
    return (
      <>
      <h4>StoryBoard:</h4>
      <ul>
        <div className="row">
            <div className="col s6">
                <ShotImg></ShotImg>
            </div>
            <div className="col s6">
                <ShotDetail></ShotDetail>
                <Link to={"/project/"+proyecto+"/chapter/"+capitulo+"/shot/"+shot} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Ver mas</Link>
            </div>
        </div>
        <div className="row">
            <div className="col s6">
                <ShotImg></ShotImg>
            </div>
            <div className="col s6">
                <ShotDetail></ShotDetail>
                <Link to={"/project/"+proyecto+"/chapter/"+capitulo+"/shot/"+shot} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Ver mas</Link>
            </div>
        </div>
      </ul>
      </>
    )
  }
}

export default StoryBoard;