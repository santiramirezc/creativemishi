import React, { useEffect, useState } from "react"
import Title from './../components/Title'
import UserCard from './../components/UserCard'
import ContributionList from './../components/ContributionList'
import ProjectCard from './../components/ProjectCard'
import M from "materialize-css"

var Profile = () => {
  const [user,setUser] = useState({projects:[]})
  const [project,setProject] = useState({name:"",description:""})
  var title = ""
  var projectsElems = <div></div>

  const deleteProject = (e) => {
    let projectId = e.target.id
    console.log(e)
    fetch('/app/deleteProject/'+projectId)
      .then( res => res.json())
      .then( data => {
        M.toast({html: data.message})
        getUser()
      })
      .catch(e => console.log(e))
  }

  if(user?.username){
    title = "Bienvenido " + user.username
    projectsElems = user.projects.map((project,index) => {
      return <ProjectCard 
        name={project.name}
        description={project.description} 
        projectId={project.projectId}
        btn1={<button onClick={deleteProject} id={project.projectId} className="btn-floating btn-large waves-effect waves-light red tooltipped" data-position="right" data-tooltip="Borrar proyecto"><i id={project.projectId}  className="material-icons">cancel</i></button> }
      >
      </ProjectCard>
    })
  }else{
    //redigir a home
    title = "Inicia sesion :c"
  }


  const createProject = (e) => {
    e.preventDefault()
    //Hacer post para crear el proyecto
    fetch('/project',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then( res => res.json())
    .then( data => {
      M.toast({html: data.message})
      //Actualizar los datos del usuario
      getUser()
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    getUser()
  },[])

  const getUser = () => {
    //Traer los datos del usuario 
    fetch('/app/user')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUser(data)
      })
      .catch((error) =>{
        M.toast({html: "Por favor inicia sesion"})
        console.log("No se pudo traer el usuario")
      })
    //Guardar el usuario en localsesion
  }  

  return (
    <div className="App">
      <Title title={title}></Title>
        { user ?
          <>
          <div className="container">
            <h4>Crear proyecto:</h4>
              <div className="row">
                <div className="col s6">
                  <form onSubmit={createProject}>
                    <input type="text" name="name" id="name" placeholder="Nombre" value={project.name} onChange={e => setProject({...project,name: e.target.value })}></input>
                    <input type="text" name="description" id="description" placeholder="Descripción" value={project.description} onChange={ e => setProject({...project,description: e.target.value})}></input>
                    <input type="submit" value="Crear proyecto"></input>
                  </form>
                </div>
              </div>
          </div>
          <div className="container">
            <h3>Mis proyectos</h3>
            <div className="row">
              <div className="col s12">
                { projectsElems }
              </div>
            </div>
          </div>
          </>
        : ""
      }
    </div>
  )
}

export default Profile
