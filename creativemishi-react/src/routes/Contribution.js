import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import M from "materialize-css"

import UploadForm from "../components/UploadForm"
import FileList from "../components/FileList"
import Feedback from "../components/Feedback"

//import { sendFeedback, deleteFile, selectFinal } from "../actions/contribution.actions"
//import { test } from "../actions/test.actions"

const Contribution = (props) => {
  const { user } = props
  const { contributionId } = useParams()
  const [feedback, setFeedback] = useState("")
  const [state, setState] = useState("")
  const [isCreator, setIsCreator] = useState()
  const [testy, setTesty] = useState("STARTING TESTY")
  const [contribution, setContribution] = useState()
  const AWS_URL = process.env.REACT_APP_AWS_ENDPOINT
  
  const actionsInit = require('../actions/contribution.actions')
 // const { getContribution, handleResponse, sendFeedback, deleteFile, selectFinal  } = actionsInit({ contributionId, contribution, setContribution, user, feedback, state})
  

  const getContribution =  ({contributionId}) => {
    console.log('Getting contribution')
    fetch(process.env.REACT_APP_API_ENDPOINT + "contribution/" + contributionId, {
      credentials: "include",
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      const {success, data, comment} = await response.json()
      if(success && data){
        setContribution(data)
      }else if(success && !data){
        console.log(comment ? comment : "no comment")
        setContribution({name:"The contribution you're looking for doesn't exist"})
        //Redirect user to 404 
      }else{
        console.log("Error getting contribution :(")
      }
    })
  }

  const handleResponse =  () => {
    getContribution({contributionId})
  }

  function sendFeedback () {
    console.log("Sending")
    //Verificar que haya al menos un archivo
    if(contribution.files.files.length < 1){
      console.log("Please include at least one file")
    }
    //Verificar que tenga un finalVersion
    if(!contribution.files.finalVersion){
      console.log("Please mark a final photo or video :)")
    }
    //Hit endpoint to update contribution state. 

    fetch(process.env.REACT_APP_API_ENDPOINT + "contribution/" + contributionId, {
      credentials: "include",
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ feedback, state })
    }).then(async (response) => {
      const {success, contribution, comment} = await response.json()
      if(success){
        getContribution({contributionId})
      }else{
        console.log("Error getting contribution :(")
      }
    })
  }

  function deleteFile (e,file) {
    e.preventDefault()
    console.log(file)
    fetch(process.env.REACT_APP_API_ENDPOINT + "contribution/"+contributionId+"/upload", {
      credentials: "include",
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({fileName:file}),
    }).then(async () => {
      handleResponse()
    });
  }

  function selectFinal (e,file) {
    e.preventDefault()
    console.log(file)
    fetch(process.env.REACT_APP_API_ENDPOINT + "contribution/"+contributionId+"/final", {
      credentials: "include",
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({fileName:file}),
    }).then(async () => {
      handleResponse()
    });
  }

  useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
    if(!contribution){
      getContribution({contributionId})
    }
    if(user.username !== contribution?.createdBy){
      setIsCreator(false)
    }else{
      setIsCreator(true)
      setState("waiting for approval")
    }
  },[contribution])









  return (
    <>
      <div className="container" >
        <h3 className="center" >Contribution for 
        <Link to={'/project/'+contribution?.projectId}>{' '+contribution?.projectId} </Link>
          Part {contribution?.part}
        </h3>
        <h4 className="center" >Name: {contribution?.name} </h4>
        <h4 className="center" >Creator: {contribution?.createdBy} </h4>
        <p><strong>Description:</strong>{'  '+ contribution?.description ? contribution?.description : 'No description'}</p>
        
          {
            contribution?.files?.finalVersion ?
              <img alt="" className="center-align" height='30%' src={ contribution?.files?.finalVersion?.location } />
            :
            "No final version seted yet"
          }
        {
          contribution?.files?.data ?
            <FileList files={contribution.files.data} showControls={ contribution?.createdBy === user.username ? true : false} deleteFile={deleteFile} selectFinal={selectFinal} />
            :
            ""
        }
        {
          user.username === contribution?.createdBy ?
            <UploadForm contributionId={contributionId} user={user} onResponse={handleResponse} />
          :
          ""
        }
      </div>
      <div className="container" >
        <h3 className="center" >Feedback</h3>
        <ul className="collection">
        {
          contribution?.history.length > 0 ?
            contribution.history.map((f,i) => {
              return (
              <li key={'feedback-'+i} className="collection-item avatar">
                <img src="/yuna.jpg" alt="" className="circle" /> 
                <span className="title"><strong>{f.username}</strong></span>
                <p style={{fontSize:'10px'}}>{f.date.slice(0,10)} </p>
                <p>{f.feedback}</p>
                <a href="#!" className="secondary-content">{f.state}</a>
              </li>
              )
              
            })

          :
          ""
        }
        </ul>
        <br/>
        </div>
      <div className="container center" >

        <div className="row">
          <div className="input-field col s8 offset-s2">
            <textarea className="materialize-textarea" id="commentTextarea" placeholder={"Please, write a comment... (if you want to)"} onChange={e => setFeedback(e.target.value)}></textarea>
            <label className="active" htmlFor="commentTextarea">Comments</label>
          </div>
        </div>


        <h4 className="center" >Current state: {contribution?.state} </h4>

        {
          user.username !== contribution?.createdBy ?
          <>
            <div className="row" >
              <div className="input-field col s4 offset-s4">
                <select defaultChecked={state}  onChange={ e => setState(e.target.value)}>
                  <option value="" >Choose your option</option>
                  <option value="approved">Approved</option>
                  <option value="changes requested">Changes requested</option>
                  <option value="closed">Closed</option>
                </select>
                <label>State</label>
              </div>
            </div>
          </>         
          :
          ""
        }
        <button onClick={sendFeedback} className="waves-effect waves-light btn center-aling">Save</button>          
        </div>


    </>
  )
}

export default Contribution