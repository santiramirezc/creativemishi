import { useEffect } from "react"
import M from 'materialize-css'

const Select = (props) => {

  const { options, id, label, setFormData, formData } = props

  useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  },[])
  
  return(
    <>
      <div className="input-field col s12">
        <select onChange={e => setFormData((oldValues) => {
                formData[id] = e.target.value
                return {...formData}
              })}>
          <option key={'select'} value={''}>Select...</option>
          {
            options.map((option) => {
              return <option key={option} value={option}>{option}</option>
            })
          }
        </select>
        <label>{label}</label>
      </div>
    </>
  )
}

export default Select