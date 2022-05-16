import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import M from "materialize-css"

const ChapterCard = (props) => {
  useEffect(() => {
    //console.log(props)
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {
      exitDelay:0,
      enterDelay:200,
      html: null,
      margin:5,
      inDuration:300,
      outDuration:250,
      position:'left',
      transitionMovement:10
    });
  },[])

  return (
    <div className="col s4 m4">
      {/* <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={props.media_url} />
        </div>
        {/* <div className="card-content hide-on-small-only">
          <span className="card-title activator grey-text text-darken-4">Parte {props.part}<i className="material-icons right">more_vert</i></span>
          <p><Link to={props.url}>{props.urlText}</Link></p>
        </div> 
        <div className="card-reveal ">
          <span className="card-title">{props.username}<i className="material-icons right">close</i></span> 
          <h6>Parte {props.part} Version {props.version}</h6> 
          <p className="show-on-small"><Link to={props.url}>{props.urlText}</Link></p>
          <p>{props.caption}</p>
          <p>{props.timestamp}</p>
          <p>{props.btn1}</p>
        </div>
      </div> */}

      <div className="card">
        <Link to={props.url}>
        <div className="card-image">
          <img alt="" src={props.media_url} />
          <span className="card-title part-title">{"P"+props.part+" "+props.username+" V"+props.version}</span>
          <div>{props.btn1}</div>
        </div>
        </Link>
      </div>
    </div>


      
  )
  
}

export default ChapterCard;
