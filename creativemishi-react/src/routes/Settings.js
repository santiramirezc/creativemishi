import React from "react"
import Title from './../components/Title'

class App extends React.Component {

  render(){
    const title = "Settings"  
    return (
      <div className="App">
        <Title title={title}></Title>
      </div>
    )
  }
}

export default App;
