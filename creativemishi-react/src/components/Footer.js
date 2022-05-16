import React from "react"

class Footer extends React.Component {
  render(){
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Creative git</h5>
              <p className="grey-text text-lighten-4">¡Bienvenido! ¡Espero creemos muchas cosas juntos!</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Redes:</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Instagram</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Youtube</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Discord</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2021 Copyright Creative git
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
