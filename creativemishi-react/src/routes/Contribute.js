import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Select from "../components/Select"
import CardForm from "../components/CardForm"

const Contribute = (props) => {
  const { project, getProject, user } = props
  const {projectId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getProject({projectId})
  },[])

  const handleResponse = (response) => {
    console.log("RESPUESTA")
    console.log(response)
    if(response.contribution._id){
      getProject({projectId})
      navigate('/contribution/'+response.contribution._id)
    }
  }
  
  return (
    <>
      <h3 className="center" >Contribute to {project?.name}</h3>
      <div className="container" >
        <div className="row" >
          <div className="col s12" >
            {
              project?.parts ?
              <CardForm user={user} onResponse={handleResponse} endpoint={'project/'+projectId+'/contribution'} action={'Create'} method={'POST'} fields={[
                {type:'select', id:'part', name:'Part', 
                  //TODO: Fix this, this is awful :c (But it works hehe)
                  options: [...project.parts.map(p => p.part).filter((p,i,s) => s.indexOf(p) === i), project.parts.map(p => p.part).filter((p,i,s) => s.indexOf(p) === i).length + 1 ] || []},
                {type:'text', id:'name', name:'Name'},
                {type:'textarea', id:'description', name:'Description (Optional)'},
                ]} />
              :
              "Loading"
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Contribute