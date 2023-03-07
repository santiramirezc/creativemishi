import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ContributionCard from "../../components/ContributionCard"

const Contributions = (props) => {
  const { user, level } = props

  const [contributions, setContributions] = useState()
  const [title,setTitle] = useState()
  let endpoint
  const { projectId } = useParams()

  useEffect(() => {
    if(!projectId){
      endpoint = process.env.REACT_APP_API_ENDPOINT + "user/contributions"
      setTitle("My contributions")
    }else{
      endpoint =process.env.REACT_APP_API_ENDPOINT + "project/"+ projectId +"/contributions"
      setTitle(projectId + " contributions")
    }
    getMyContributions()  

  },[projectId])

  const getMyContributions = () => {
    fetch(endpoint, {
      credentials: "include",
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      const {success,contributions, comment} = await response.json()
      if(success && contributions){
        setContributions(contributions)
      }else if(success && !contributions){
        console.log(comment ? comment : "no comment")
        //Redirect user to 404 
      }else{
        console.log("Error getting user contributions :(")
      }
    })
  }

  return (
    <>
      <h3 className="center" >{title}</h3>
      <div className="row">
        {
          contributions?.length > 0 ?
            contributions.map((contribution) => {
              return <ContributionCard contribution={contribution}/>
            })
          :
          "You don't have any contributions yet"
        }
      </div>

    </>
  )
}

export default Contributions