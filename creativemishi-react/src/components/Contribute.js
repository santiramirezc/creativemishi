import React, {useRef, useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import { Redirect, useLocation } from "react-router-dom";
import M from "materialize-css"

var Contribute = ({project, getProject}) => {
  //const [links, setLinks] = useState([])
  const [caption, setCaption] = useState("")
  const { projectId, partId } = useParams()
  const textarearef = useRef(null)



  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    });

    if(!project?.projectId){
      getProject(projectId)
    }
  },[])

  useEffect(()=>{
    generateCaption()
  })

  const updateUser = () => {
    fetch('/app/update')
      .then( res => res.json())
      .then( data => M.toast({html:"Usuario actualizado :D"}))
      .catch( e => {
        M.toast({html:"Ocurrió un error :c"})
        console.log(e)
      } )
  }
  /*
  const getProject = async ({id}) => {
    console.log(id)
    let project = await projects.find( project => project._id === id)
    console.log(project)
    
    if(project != undefined){
      console.log("Existe")
      setProject(project)
    }
    if(project != undefined && project.parts != undefined && project.parts.length > 0){
      console.log("Tiene partes")
      var partes = project.parts.length + 1
      setParts(
        [<option key={"seldfcdc"} value="" >Seleccionar</option>]
        .concat(project.parts.map((a,i) => {
          i++
          return <option key={"part_"+i} value={i} >{i }</option>
        })
        .concat([
          <option key={"part_"+partes} value={partes} >{partes}</option>
        ])
      ))
    }
    
    else{
      setProject({})
      setParts([])
      setPart({})
    }
    
  }*/
/*
  const getPart = ({id}) => {
    id--
    console.log(id)
    let part = project.parts[id]
    console.log(part)
    
    if(part != undefined){
      console.log("Existe la parte")
      setPart(part)
      part.version++
    }else{
      setPart({})
    }
    // if(part != undefined && part.links != undefined){
    //   setLinks(part.links)
    // }
    // else{
    //   setLinks([])
    // }
    
  }*/

  var tipos = ["Post","Edited","Final"].map((type,i) => {
    return <option key={type} value={type} >{type}</option>
  })

  var generateCaption = () => {
    let cuttlyURL = ""
    if(project.cuttlyURL){
      cuttlyURL = "\n \n Ver proyecto: "+project.cuttlyURL
    }
    let caption = "#creative_git  #project_"+ projectId +" #part_"+ partId + cuttlyURL
    setCaption(caption)
    M.updateTextFields();
    M.textareaAutoResize(document.getElementById('textarea1'))
    //alert("Heey")
  }

  var copytoClipboard = (e) => {
    textarearef.current.select()
    document.execCommand('copy')
    console.log("Copiado!")
    M.toast({html: 'Copiado!'})
  }

//   var addLink = () => {
//     console.log("Esto es links:")
//     console.log(links)
//     var l = links.concat([{name:"2",link:"df"}])
//     setLinks(l)
//     console.log(links)
//   }

//   const updateLink = i => (e) => {

//     console.log('index: ' + i);
//     console.log('property name: '+ e.target.name);
//     let newArr = [...links]; // copying the old datas array
//     newArr[i][e.target.name] = e.target.value; // replace e.target.value with whatever you want to change it to

//     setLinks(newArr); // ??
// }

  return (
    <div className="col s10 offset-s1 m4 offset-m2 z-depth-4 card-panel">
        <div className="row">
            <h2 className="center login-form-text">Contribuir</h2>
        </div>
        <div className="row">
          <div className="col s12">
            <h2>Proyecto: {projectId}</h2>
            <h2>Parte: {partId}</h2>
          </div>
        </div>
            {/* <div className="row">
              <div className="col s12">
              <h4>Links:</h4>
              {links.length > 0 
                ? links.map((linkobj,i) => {
                  return (
                    <div key={linkobj.name} className="row">
                    <div className="col s6">
                    <input type="text" id={i+"name"} name="name" value={links[i].name} onChange={updateLink(i)}></input>
                    <label htmlFor={i+"name"}>Nombre</label>
                    </div>
                    <div className="col s6">
                    <input type="text" id={i+"link"} name="link" value={links[i].link} onChange={updateLink(i)}></input>
                    <label htmlFor={i+"link"}>Link</label>
                    </div>
                    </div>
                    )
                  })
                  : ""
                }
                </div>
                <a className="waves-effect waves-light btn" onClick={addLink}><i className="material-icons left">add</i>Añadir link</a>
              </div>           
        <div className="row">
          <div className="col s12">
            <select style={{display:"block"}} onChange={e => setSelected({...selected,type:e.target.value})}>
              {tipos.length > 0 
                ? tipos
                : ""
              }
            </select>
            <label>Tipo</label>
          </div>
        </div> */}
        <div className="row">
          <div className="input-field col s12">
            <textarea ref={textarearef} id="textarea1" className="materialize-textarea " value={caption} onChange={ e => setCaption(e.target.value)}></textarea>
            <label htmlFor="textarea1" className="active">Hashtags</label>
          </div>
        </div>
        
        <div className="row">
          <div className="col s3">
            <button className="btn waves-effect waves-light green" onClick={e => copytoClipboard()}>
              Copiar
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <button className="btn waves-effect waves-light blue" onClick={e => updateUser()}>
              Actualizar usuario
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <Link to={"/project/"+projectId} className="waves-effect waves-light btn"><i className="material-icons left">arrow_back</i>Volver</Link>
          </div>
        </div>
    </div>
  )
}

export default Contribute;
