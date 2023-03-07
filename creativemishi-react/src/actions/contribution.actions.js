module.exports = ({ contributionId, contribution, setContribution, user, feedback, state}) => {

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
  
  return {
    getContribution,
    handleResponse,
    test: () => {
      console.log("testing")
    },

    sendFeedback: () => {
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
    },
    
    
    deleteFile: (e,file) => {
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
    },

    selectFinal: (e,file) => {
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
    },
  }

}