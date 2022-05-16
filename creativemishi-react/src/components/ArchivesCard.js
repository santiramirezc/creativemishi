import React from "react"
import {Link} from "react-router-dom"

class ArchivesCard extends React.Component {
  render(){
    return (
      <div>
        <h3>Archivos:</h3>
         <ul className="collection">
          <li className="collection-item avatar">
            <img src="/yuna.jpg" alt="" className="circle" />
            <span className="title">Title</span>
            <p>First Line <br/>
              Second Line
            </p>
            <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
          </li>
          <li className="collection-item avatar">
            <i className="material-icons circle">folder</i>
            <span className="title">Title</span>
            <p>First Line <br/>
              Second Line
            </p>
            <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
          </li>
          <li className="collection-item avatar">
            <i className="material-icons circle green">insert_chart</i>
            <span className="title">Title</span>
            <p>First Line <br/>
              Second Line
            </p>
            <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
          </li>
          <li className="collection-item avatar">
            <i className="material-icons circle red">play_arrow</i>
            <span className="title">Title</span>
            <p>First Line <br/>
              Second Line
            </p>
            <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
          </li>
        </ul>
        <Link to="/Upload" className="waves-effect waves-light btn"><i className="material-icons left">download</i>Descargar</Link>
      </div>
    )
  }
}

export default ArchivesCard;
