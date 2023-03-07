import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import PartCard from "../components/PartCard"


const Project = (props) => {
  const { user, project, setProject, getProject } = props
  const [isAdmin,setIsAdmin] = useState(false)
  const { projectId } = useParams()

  useEffect(() => {
    getProject({ projectId })

    if(!project || projectId !== project.projectId){
      if( user?.projects ){
        user.projects.some((p,i) => {
          if(p.projectId === projectId){
            console.log("Eres dueño o admin de este proyecto :D")
            setIsAdmin(true)
            return true
          }
          return false
        })
      }
    }

    
  },[])

  return (
    <>
      <h3 className="center" >{project?.name}</h3>
      <div className="center-align">
        <Link to={'contribute'} className="waves-effect waves-light btn center-aling">Contribute</Link>
        <Link to={'contributions'} className="waves-effect waves-light btn center-aling">See contributions</Link>
      </div>
      <div className="row">
        {
          project?.parts ?
            project.parts.map((part) => {
              return <PartCard key={part._id} part={part} />
            })
          :
            "No parts in the project"
        }
      </div>

    </>
  )
}

export default Project