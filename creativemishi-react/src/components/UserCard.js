import React from "react"

class Footer extends React.Component {
  render(){
    return (
      <>
      <div id="profile-page-header" className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="user-profile-bg.jpg" alt="user background" />                    
                </div>
                <figure className="card-profile-image">
                    <img src="avatar.jpg" alt="profile image" className="circle z-depth-2 responsive-img activator" />    
                </figure>
                <div className="card-content">
                  <div className="row">                    
                    <div className="col s3 offset-s2">                        
                        <h4 className="card-title grey-text text-darken-4">Roger Waters</h4>
                        <p className="medium-small grey-text">Project Manager</p>                        
                    </div>
                    <div className="col s2 center-align">
                        <h4 className="card-title grey-text text-darken-4">10+</h4>
                        <p className="medium-small grey-text">Work Experience</p>                        
                    </div>
                    <div className="col s2 center-align">
                        <h4 className="card-title grey-text text-darken-4">6</h4>
                        <p className="medium-small grey-text">Completed Projects</p>                        
                    </div>                    
                    <div className="col s2 center-align">
                        <h4 className="card-title grey-text text-darken-4">$ 1,253,000</h4>
                        <p className="medium-small grey-text">Busness Profit</p>                        
                    </div>                    
                    <div className="col s1 right-align">
                      <a className="btn-floating activator waves-effect waves-light darken-2 right">
                          <i className="mdi-action-perm-identity"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-reveal">
                    <p>
                      <span className="card-title grey-text text-darken-4">Roger Waters <i className="mdi-navigation-close right"></i></span>
                      <span><i className="mdi-action-perm-identity cyan-text text-darken-2"></i> Project Manager</span>
                    </p>

                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                    
                    <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2"></i> +1 (612) 222 8989</p>
                    <p><i className="mdi-communication-email cyan-text text-darken-2"></i> mail@domain.com</p>
                    <p><i className="mdi-social-cake cyan-text text-darken-2"></i> 18th June 1990</p>
                    <p><i className="mdi-device-airplanemode-on cyan-text text-darken-2"></i> BAR - AUS</p>
                </div>
            </div>
      
      </>
    )
  }
}

export default Footer;
