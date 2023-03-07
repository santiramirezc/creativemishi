import React , {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"

var Login = ({ user, setUser}) => {
  const navigate = useNavigate()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    if(user){
      console.log("vamo para home")
      navigate('/')
    }
  },[])

  var loginUser = (credentials) => {
    return fetch(API_ENDPOINT+'auth/login',{
      method:'POST',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await loginUser({
      username,
      password
    })
    if(response){
      console.log("Loggeado!!!")
      setUser(response.user)
      console.log(user)
      navigate('/')
    }else{
      console.log("No existe el usuario")
    }    
  }

    
  return (
    <div className="row">
    <div className="col s12">
    
    <div className="col s6 offset-s3 z-depth-4 card-panel">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12 center">
            <h3 className="center login-form-text">Login</h3>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="username" type="text" onChange={e => setUsername(e.target.value)} />
            <label htmlFor="username" className="center-align">username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button type="submit" className="btn waves-effect waves-light col s12">Log in</button>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
              <p className="margin center-align medium-small"><a href="page-forgot-password.html">Recover password</a></p>
          </div>          
        </div>

      </form>
    </div>
    </div>
    </div>
  )
  
}

export default Login;
