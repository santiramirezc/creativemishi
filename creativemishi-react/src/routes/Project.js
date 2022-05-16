import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams, Redirect, useHistory } from "react-router-dom"
import Title from './../components/Title'
import DetailsCard from './../components/DetailsCard'
import ChapterCard from './../components/ChapterCard'
import M from 'materialize-css'
import { disconnect } from "mongoose"

const Project = ({project,getProject}) => {
  const [part, setPart] = useState("")
  const [partIndex, setPartIndex] = useState({})
  const [height, setHeight] = useState()
  const [nextPart, setNextPart] = useState("")
  const { projectId } = useParams()
  const { pathname } = useLocation();
  const { partId } = useParams();
  const history = useHistory()
  
  useEffect(() => {
    console.log(pathname)
    const getPart = () => {
      if(!project){
        getProject(projectId)
      }
      console.log("Ok me estoy ejecutando")
      if(partId){
        console.log("bueno part id es: "+partId)
        if(project.parts[partId]){
          setPart(project.parts[partId - 1])
          history.push("/project/"+projectId+"/part/"+project.parts[partId - 1].part) 
          setPartIndex(partId - 1)  
        }
      }
      else if(project.parts[0]){
        setPart(project.parts[0])
        history.push("/project/"+projectId+"/part/"+project.parts[0].part)    
        setPartIndex(0)
      }
      else{
        console.log("NO existe esta parte, sorry")
      }      
    }
    getPart()
    
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems, {});
    setHeight(window.screen.height)
    if(project.parts.length == 0 || project.projectId != projectId){
      getProject(projectId)
      var a = project.parts.length + 1
      setNextPart(a)
    }else{
      var a = project.parts.length + 1
      setNextPart(a)
    }
  },[project,partId])

  const nextVersion = (e) => {
    e.preventDefault()
    let npart = partIndex + 1
    console.log("new part index "+npart)
    if(project.parts[npart]){      
      console.log("The part exists")
      let newpathname = pathname.split("/")
      newpathname.pop()
      newpathname.push(project.parts[npart].part)
      newpathname = newpathname.join("/")
      console.log(newpathname)
      history.push(newpathname)
    }else{
      M.toast({html:"This is the last version"})
    }
  }

  const previousVersion = (e) => {
    e.preventDefault()
    let npart = partIndex - 1
    console.log("new part index "+npart)
    if(project.parts[npart]){
      console.log("The part exists")
      let newpathname = pathname.split("/")
      newpathname.pop()
      newpathname.push(project.parts[npart].part)
      newpathname = newpathname.join("/")
      console.log(newpathname)
      history.push(newpathname)
    }else{
      M.toast({html:"This is the first version"})
    }
  }

  const newPart = (e) => {
    e.preventDefault()
    try{
      let newpathname = pathname.split("/")
      newpathname.pop()
      newpathname.push(project.parts.length + 1)
      newpathname.push("contribute")
      newpathname = newpathname.join("/")
      console.log(newpathname)
      history.push(newpathname)      
    }catch(err){    
      M.toast({html:"err"})
    }
  }

    const title = project.name ? "Proyecto: "+project.name : "No pudimos traer el proyecto :c"
    return (
      <div className="App">
        <div className="row">
          <div className="col s6">
            <Link to={"/"} className="waves-effect waves-light btn blue btn-control"><i className="material-icons left">arrow_back</i>Volver</Link>
          </div>
          
        </div>        
        
        <div className="row">
          <div className="col s12 m6">
            <div className="row center">
              <h4>Parte {part?.part} Version {part?.version}</h4>
              <h5>{part?.username}</h5>
            </div>
            <img alt="" className="materialboxed post" height={height * 0.5} src={part?.media_url}  />
            <div className="center"> 
              <Link to={pathname+"/v/"+part?.version} className="waves-effect waves-light btn btn-control"><i className="material-icons left">remove_red_eye</i>See versions</Link>          
              <Link to={pathname+"/contribute"} className="waves-effect waves-light btn btn-control"><i className="material-icons left">add</i>¡Contribute to this part!</Link>
            </div>
            <div className="center">
              <div className="waves-effect waves-light btn blue btn-control" onClick={(e) => previousVersion(e)} ><i className="material-icons left">arrow_back</i>Previous part</div>
              <div className="waves-effect waves-light btn blue btn-control" onClick={(e) => nextVersion(e)} ><i className="material-icons right">arrow_forward</i>Next part</div>
            </div>
          </div>
          <div className="container">
            <div className="col s12 m6">
              
              <div className="row">
                <Title title={title}></Title>
              </div>
              <div className="row">
                <DetailsCard description={project.description}></DetailsCard>
              </div>
              
              <div className="row">
                <div className="col s6">
                  <div onClick={newPart} className="waves-effect waves-light btn"><i className="material-icons left">add</i>New PART</div>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <Link to={"/project/"+project.name+"/contributions"} className="waves-effect waves-light btn"><i className="material-icons left">add</i>See all contributions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row center">
          <h4>Parts of the project:</h4>
        </div>
        <div className="row">
            {
              project.parts.map((post,index) => {
                return <ChapterCard 
                  id={post.postId} 
                  caption={post.caption}
                  media_type={post.media_type}
                  media_url={post.media_url} 
                  part={post.part}
                  projectId={project.projectId}
                  timestamp={project.timestamp}
                  username={post.username} 
                  version={post.version}
                  url={"/project/"+post.projectId+"/part/"+ (post.part) }
                  urlText={"Ver versiones"}
                ></ChapterCard>
              })
            }         
        </div>
      </div>
    )
}

export default Project
