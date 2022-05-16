import React, { useRef, useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Title from './../components/Title'
import ChapterCard from './../components/ChapterCard'
import M from 'materialize-css'

const PartContributions = ({user,project,getProject}) => {
  
  const [parts, setParts] = useState([])
  const [part, setPart] = useState({})
  var {projectId} = useParams()
  var {partId} = useParams()
  const { pathname } = useLocation();
  var carousel = useRef()
  var btnapprove

  useEffect(() => {
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, {});
    getParts()
  },[])

  const getParts = () =>{
    fetch('/app/project/'+projectId+'/part/'+partId)
      .then( res => res.json())
      .then( data => {
        console.log("Heey")
        console.log(data)
        setParts(data)
      })
      .catch(e => console.log(e))
  }

  const disapprovePost = (e) => {
    let postId = e.target.id
    console.log(postId)
    fetch('/app/disapprovePost/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getParts()
        getProject(projectId)
      })
      .catch(e => console.log(e))
  }

  const versionUp = (e) => {
    let postId = e.target.id
    console.log(postId)
    fetch('/app/versionUp/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getParts()
        getProject(projectId)
      })
      .catch(e => console.log(e))
  }

  const versionDown = (e) => {
    let postId = e.target.id
    console.log(postId)
    fetch('/app/versionDown/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getParts()
        getProject(projectId)
      })
      .catch(e => console.log(e))
  }

  const test = () => {
    return parts.map((post,index) => {
      return <a class="carousel-item" href="#one!"><img src={post.media_url} /></a>
    })
  }

  const title = "Parte "+partId
  return (
    <div className="App">
      <div className="row">
        <Title title={title}></Title>
      </div>
      <div className="row">         
          {
            parts.map((post,index) => {
              //if(true){
              if(user?.username && project?.username &&project.username == user.username){
                let btns = () => {
                  return (
                    <>
                      <button onClick={disapprovePost} id={post.postId} className="btn-floating btn-large waves-effect waves-light red tooltipped" data-position="right" data-tooltip="Desaprobar"><i id={post.postId}  className="material-icons">cancel</i></button><br/>
                      <button onClick={versionUp} id={post.postId} className="btn-floating btn-large waves-effect waves-light blue tooltipped" data-position="right" data-tooltip="Subir version"><i id={post.postId}  className="material-icons">arrow_upward</i></button><br/>
                      <button onClick={versionDown} id={post.postId} className="btn-floating btn-large waves-effect waves-light orange tooltipped" data-position="right" data-tooltip="Bajar version"><i id={post.postId}  className="material-icons">arrow_downward</i></button>
                    </>
                  )
                }
                btnapprove = btns()
              }
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
            })
          }  
      </div>
      <div class="slider">
        <ul class="slides">
          <li>
            <img src="https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/169233130_866994497481378_6475869905302516460_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=p03R1fvr8PUAX9jxnbl&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=bf6c23ab858bd328ab54900487e0f9c4&oe=60B6B66C" />
            <div class="caption center-align">
              <h3>This is our big Tagline!</h3>
              <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
            </div>
          </li>
          <li>
            <img src="https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/169233130_866994497481378_6475869905302516460_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=p03R1fvr8PUAX9jxnbl&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=bf6c23ab858bd328ab54900487e0f9c4&oe=60B6B66C" />
            <div class="caption left-align">
              <h3>Left Aligned Caption</h3>
              <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
            </div>
          </li>
        </ul>
      </div>
      <div className="row">
          <div className="col s6">
            <Link to={pathname+"/contribute"} className="waves-effect waves-light btn"><i className="material-icons left">add</i>Contribuir</Link>
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

export default PartContributions
