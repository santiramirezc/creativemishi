import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import VersionCard from "../components/VersionCard"
import FileList from "../components/FileList"

const Part = (props) => {
  const { user } = props
  const { partId, projectId } = useParams()
  const [part,setPart] = useState()
  const [parts,setParts] = useState()

  const endpoint = `${process.env.REACT_APP_API_ENDPOINT}project/${projectId}/part/${partId}`

  const getParts = () => {
    fetch(endpoint, {
      credentials: "include",
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      const {success,data, comment} = await response.json()
      if(success && data){
        setParts(data)
        setPart(data[data.length -1])
      }else if(success && !data){
        console.log(comment ? comment : "no comment")
        //Redirect user to 404 
      }else{
        console.log("Error getting data :(")
      }
    })
  }

  useEffect(() => {
    getParts()
  },[])

  return (
    <>
      <div className="container" >
        <h3 className="center" >Part {part?.part} Version {part?.version} of
        <Link to={'/project/'+part?.projectId}>{' '+part?.projectId} </Link> project      
        </h3>
        <h4 className="center" >Name: {part?.name} </h4>
        <h4 className="center" >Creator: {part?.createdBy} </h4>
        <p><strong>Description:{' '}</strong>{part?.description ? part?.description : 'No description'}</p>
        <img alt="" className="center-align" height='30%' src={ part?.files?.finalVersion?.location } />
        <div className="row center">
          <Link style={{"margin-right":40}} to={'contribute'} className="waves-effect waves-light btn center-aling">Next</Link>
          <Link style={{"margin-left":40}}to={'contribute'} className="waves-effect waves-light btn center-aling">Previous</Link>
          
        </div>

        {
          part?.files.data ?
            <FileList user={user} files={part.files.data} showControls={false} />
            :
            ""
        }
      </div>
      <div className="container" >

        <div className="row">
          <h3>Versions:</h3>
          {
            parts ?
              parts.map((part) => {
                return <VersionCard key={part._id} part={part} />
              })
            :
              "No parts in the project"
          }
        </div>
      </div>
    </>
  )
}

export default Part