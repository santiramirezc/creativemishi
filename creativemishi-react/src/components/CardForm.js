import React , {useEffect, useState} from "react"
import Select from "./Select"
import M from "materialize-css"

const CardForm = (props) => {
  const { user, onResponse } = props
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const { endpoint, action, method, fields } = props
  const [formData,setFormData] = useState({})

  useEffect(() => {
    M.updateTextFields()
    var elem = document.querySelector('.chips');
    var instance = M.Chips.init(elem, {
      placeholder:'Insert username',
      secondaryPlaceholder:'+ username',
      onChipAdd: () => {
        const cleanChips = instance.chipsData.map((chip) => {
          return {username:chip.tag, role:'admin'}
        })
        console.log(cleanChips)
        formData[elem.id] = cleanChips
      }
    });
  })

  const sendForm = (e) => {
    e.preventDefault()
    //Hacer post para crear el proyecto
    fetch(API_ENDPOINT + endpoint,{
      method,
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData)
    })
    .then( res => res.json())
    .then( data => {
      onResponse(data)
      if(data?.comment){
        M.toast({html: data.comment})
      }
      if(data?.error){
        M.toast({html: data.error})
      }
      //Actualizar los datos del usuario
      //getUser()
    })
    .catch(e => console.log(e))
  }

  return (
    <div className="card darken-1 col s6">
      <div className="card-content ">
        <span className="card-title">{props.title}</span>
        <p></p>
        <form onSubmit={sendForm}>
          {
          fields.map((field) => {
            if(field.type === 'textarea'){
              return (
                <>
                <div className="input-field col s12" >
                  <textarea className="materialize-textarea" id={field.id} key={field.id} name={field.name} placeholder={field.name} value={formData[field.id]} onChange={e => setFormData((oldValues) => {
                    formData[field.id] = e.target.value
                    return {...formData}
                  })}></textarea>
                  <label htmlFor={field.id}>{field.name}</label>
                </div>
                </>
              )
            }
            else if(field.type === 'chips'){
              return (
                <div className="col s12" >
                  <div id={field.id} key={field.id} className="chips chips-placeholder col s12"></div>
                  <label htmlFor={field.id}>{field.name}</label>
                </div>
              )
            }
            else if(field.type === 'hidden'){
              formData[field.id] = field.value
            }
            else if(field.type === 'select'){
              return <Select options={field.options}id={field.id} label={field.name} setFormData={setFormData} formData={formData} />
            }
            else{
              return (
                <div className="input-field col s12">
                  <input type={field.type} id={field.id} key={field.id} name={field.name} placeholder={field.name} value={formData[field.id]} onChange={e => setFormData((oldValues) => {
                    formData[field.id] = e.target.value
                    return {...formData}
                  })}>
                  </input>
                  <label htmlFor={field.id}>{field.name}</label>
                </div>
              )
            }
          })
        }
          <div className="center-align">
            <input type="submit" value={action} className="waves-effect waves-light btn center-aling"></input>
          </div>
        </form>
      </div>
      <div className="card-action">
      </div>
    </div>
  )
  
}

export default CardForm