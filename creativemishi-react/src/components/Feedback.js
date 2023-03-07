import { useState } from "react"

const Feedback = (props) => {
  const { feedback } = props
  const [comment, setComment] = useState("")
  return (    
    <>
      <h3 className="center" >Feedback</h3>
      {
        feedback.length > 0 ?
          feedback.map((f) => {
            return f.comment
          })
        :
        ""
      }
      <div className="input-field col s12">
        <textarea className="materialize-textarea" id="commentTextarea" placeholder={"Please, write a comment... (if you want to, no one is forcing you)"} onChange={e => setComment(e.target.value)}></textarea>
        <label className="active" htmlFor="commentTextarea">Comments</label>
      </div>
    </>
  )
}

export default Feedback