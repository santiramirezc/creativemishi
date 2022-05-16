import React, { useEffect } from "react"
import "materialize-css/dist/css/materialize.min.css"
import M from "materialize-css";

const DetailsCard = (props) => {

  useEffect(() =>{
    var elems = document.querySelectorAll('.collapsible');
    var instances2 = M.Collapsible.init(elems, {accordion: false});
    var elems2 = document.querySelector('.collapsible');
    var instanceColaps = M.Collapsible.getInstance(elems2)
    // TO DO Loop for n properties for(i=0; i<3; i++){
      setTimeout(() =>{instanceColaps.open(0)},1000)
      setTimeout(() =>{instanceColaps.open(1)},1250)
      setTimeout(() =>{instanceColaps.open(2)},1350)
    //console.log(i)     
  },[])

  return (
    <>
    <h4>Detalles:</h4>
    <ul className="collapsible expandable">
      <li>
        <div className="collapsible-header"><i className="material-icons">filter_drama</i>Descripción</div>
        <div className="collapsible-body"><span>{props.description}</span></div>
      </li>
    </ul>  
    </>   
  )
  
}

export default DetailsCard
