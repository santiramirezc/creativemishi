import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import Title from './../components/Title'
import DetailsCard from './../components/DetailsCard'
import ChapterCard from './../components/ChapterCard'
import M from 'materialize-css'

const ProjectContributions = ({user,project,getProject}) => {
  
  const [parts, setParts] = useState([])
  const [part, setPart] = useState({})
  const { projectId } = useParams()

  useEffect(() => {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {});
    getParts()
  },[])

  const getParts = () => {
    fetch('/app/project/'+projectId+'/contributions')
    .then( res => res.json())
    .then( data => {
      console.log("Heey")
      console.log(data)
      setParts(data)
    })
    .catch(e => console.log(e))
  }

  const approvePost = (e) => {
    e.preventDefault()
    let postId = e.target.id
    console.log(postId)
    fetch('/app/approvePost/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getParts()
        getProject(projectId)
      })
      .catch(e => console.log(e))
  }

  var btnapprove

  

  const title = "Contribtuions for "+projectId
  return (
    <div className="App">
      <div className="row">
        <Title title={title}></Title>
      </div>
      <div className="row">          
        <div className="col s12">
          {
            parts.map((post,index) => {
              //if(true){
              if(user?.username && project?.username && project.username == user.username){
                btnapprove = <button onClick={approvePost} id={post.postId} className="btn-floating halfway-fab waves-effect waves-light green" data-position="right" data-tooltip="Aprobar"><i id={post.postId}  className="material-icons">check</i></button>
              }

              if(post.approved.state == "Contribution"){
                return <ChapterCard 
                  id={post.postId} 
                  caption={post.caption}
                  media_type={post.media_type}
                  media_url={post.media_url} 
                  part={post.part}
                  projectId={post.projectId}
                  timestamp={post.timestamp}
                  username={post.username} 
                  version={post.version}
                  url={"/post/"+post.postId}
                  urlText={"Ver post"}
                  btn1={btnapprove}                    
                ></ChapterCard>
              }
            })
          }            
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <Link to={"/project/"+projectId} className="waves-effect waves-light btn"><i className="material-icons left">arrow_back</i>Volver</Link>
        </div>
      </div>
      
    </div>
  )
}

export default ProjectContributions
