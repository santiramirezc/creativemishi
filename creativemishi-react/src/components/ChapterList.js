import React from "react"
import ChapterCard from "./ChapterCard"
import {Link} from "react-router-dom"

class ChapterList extends React.Component {
  render(){
    return (
      <>
      <h4>Capitulos:</h4>
      <ul>
        <div className="row">
          <ChapterCard></ChapterCard>
        </div>
      </ul>
      <Link to="/NewChapter" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>New Chapter</Link>
      </>
    )
  }
}

export default ChapterList;
