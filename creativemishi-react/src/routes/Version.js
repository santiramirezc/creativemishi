import React, { useRef, useEffect, useState } from "react"
import { Link, useLocation, useParams, useHistory} from "react-router-dom"
import Title from './../components/Title'
import ChapterCard from './../components/ChapterCard'
import M from 'materialize-css'
import e from "cors"

const Version = ({user,project,getProject}) => {
  
  const [parts, setParts] = useState([])
  const [part, setPart] = useState({})
  const [partIndex, setPartIndex] = useState({})
  const [versionO, setVersionO] = useState({})
  const [height, setHeight] = useState()
  var { projectId } = useParams()
  var { partId } = useParams()
  var { version } = useParams()
  const { pathname } = useLocation();  
  const history = useHistory()
  var tabs = useRef()
  var btnapprove

  useEffect(() => {
    var elems = document.querySelectorAll('.materialboxed');
    let tabsa = document.querySelector(".tabs")
    var tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltips, {});
    M.Tabs.init(tabsa, {});
    M.Materialbox.init(elems, {});
    var FABs = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(FABs, {toolbarEnabled: true});
    
    const getParts = () =>{
      fetch('/app/project/'+projectId+'/part/'+partId)
        .then( res => res.json())
        .then( data => {
          console.log("Heey")
          console.log(data)
          setParts(data)
          filterVersion(data)
        })
        .catch(e => console.log(e))
    }
    getParts()
    
    
    const filterVersion = (partes) => {
      for(let i=0;i < partes.length; i++){
        let post = partes[i]
        //console.log(post.version+ " Comparando con "+ version)
        if(post.version.toString() === version){
          setVersionO(post)
          setPart(post)
          setPartIndex(i)
          break;
        }
      }        
    }
    
    if(project?.projectId !== projectId){
      getProject(projectId)
    }
    setHeight(window.screen.height)
    
  },[])

  useEffect(() => {
    const filterVersion = (partes) => {
      for(let i=0;i < partes.length; i++){
        let post = partes[i]
        //console.log(post.version+ " Comparando con "+ version)
        if(post.version.toString() === version){
          setVersionO(post)
          setPart(post)
          setPartIndex(i)
          break;
        }
      }        
    }
    
    filterVersion(parts)
  },[version])

  const getParts = () =>{
    fetch('/app/project/'+projectId+'/part/'+partId)
      .then( res => res.json())
      .then( data => {
        console.log("Heey")
        console.log(data)
        setParts(data)
        filterVersion(data)
      })
      .catch(e => console.log(e))
  
    }

    const filterVersion = (partes) => {
      for(let i=0;i < partes.length; i++){
        let post = partes[i]
        //console.log(post.version+ " Comparando con "+ version)
        if(post.version.toString() === version){
          setVersionO(post)
          setPart(post)
          setPartIndex(i)
          break;
        }
      }        
    }

  const disapprovePost = (e) => {
    e.preventDefault()
    let postId = versionO.postId
    console.log(postId)
    fetch('/app/disapprovePost/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getProject(projectId)
        getParts()
      })
      .catch(e => console.log(e))
  }

  const versionUp = (e) => {
    e.preventDefault()
    let postId = versionO.postId
    console.log(postId)
    fetch('/app/versionUp/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getProject(projectId)
        getParts()
      })
      .catch(e => console.log(e))
  }

  const versionDown = (e) => {
    e.preventDefault()
    let postId = versionO.postId
    console.log(postId)
    fetch('/app/versionDown/'+postId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        console.log(data)
        getProject(projectId)
        getParts()
      })
      .catch(e => console.log(e))
  }

  const nextVersion = (e) => {
    e.preventDefault()
    let npart = partIndex + 1
    console.log("new part index "+npart)
    if(parts[npart]){      
      console.log("The part exists")
      let newpathname = pathname.split("/")
      newpathname.pop()
      newpathname.push(parts[npart].version)
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
    if(parts[npart]){
      console.log("The part exists")
      let newpathname = pathname.split("/")
      newpathname.pop()
      newpathname.push(parts[npart].version)
      newpathname = newpathname.join("/")
      console.log(newpathname)
      history.push(newpathname)
    }else{
      M.toast({html:"This is the first version"})
    }
  }

  const contributeLink = (e) => {
    e.preventDefault()
    try{
      let newpathname = pathname.split("/")
      newpathname.pop()
      newpathname.pop()
      newpathname.push("contribute")
      newpathname = newpathname.join("/")
      console.log(newpathname)
      history.push(newpathname)
    }
    catch(err){
      M.toast({html:err})
    }
  }

  
  return (
    <div className="App">
      <div className="row">
          <div className="col s6">
          <Link to={"/project/"+projectId} className="waves-effect waves-light btn btn-control"><i className="material-icons left">arrow_back</i>Volver</Link>
        </div>
      </div>        
      <div className="row center">
        <h4>Parte {partId} Version {part?.version}</h4>
      </div>
      <div className="row">
        <img alt="" className="materialboxed post" height={height * 0.5} src={part.media_url}  />
      </div>
      <div className="row center">
        <div className="waves-effect waves-light btn blue btn-control" onClick={(e) => previousVersion(e)} ><i className="material-icons left">arrow_back</i>Previous version</div>
        <div className="waves-effect waves-light btn blue btn-control" onClick={(e) => nextVersion(e)} ><i className="material-icons right">arrow_forward</i>Next version</div>
      </div>
      <div className="divider"></div>
        <div className="row center">
            <div onClick={contributeLink} className="waves-effect waves-light btn btn-control"><i className="material-icons left">add</i>¡Contribute!</div>
        </div>
      <div className="divider"></div>
      <div className="row center">
        <div className="waves-effect waves-light btn btn-control" onClick={versionUp} ><i className="material-icons left">arrow_upward</i>Version Up</div>
        <div className="waves-effect waves-light btn btn-control" onClick={versionDown} ><i className="material-icons left">arrow_downward</i>Version Down</div>
        <div className="waves-effect waves-light btn red btn-control" onClick={disapprovePost} ><i className="material-icons left">cancel</i>Disapprove Post</div>
      </div>
      <div className="row">
        <div className="fixed-action-btn toolbar">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">mode_edit</i>
          </a>
          <ul>
            <li><a className="btn-floating red btn tooltipped" data-position="top" data-tooltip="Version anterior"><i className="material-icons">arrow_back</i></a></li>
            <li><a className="btn-floating red btn tooltipped" data-position="top" data-tooltip="Parte anterior"><i className="material-icons">arrow_upward</i></a></li>
            <li><a className="btn-floating red btn tooltipped" data-position="top" data-tooltip="Siguiente parte"><i className="material-icons">arrow_downward</i></a></li>
            <li><a className="btn-floating red btn tooltipped" data-position="top" data-tooltip="Siguiente version"><i className="material-icons">arrow_forward</i></a></li>
          </ul>
        </div>
        <div className="row">
          {
            parts.map((post,index) => {
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
                url={"/project/"+post.projectId+"/part/"+post.part+"/v/"+post.version}
                urlText={"Ver versiones"}
              ></ChapterCard>
            })
          }         
        </div>
      </div>
      
    </div>
  )
}

export default Version
