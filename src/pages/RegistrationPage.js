import React, { Component, Fragment } from "react";
import RegistrationComponent from "../auth/RegistrationComponent";
import {NavLink } from "react-router-dom";

class RegistrationPage extends Component{

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push("/userpage");  
    }

    render(){
        return(
            <Fragment>

                <header className="header-component">
                <NavLink to="/login" className='home-login' ><span className="login-text"><strong>Login</strong></span></NavLink>
                    <div className="content">
                    <div className="fridgy-title">Fridgy <span className="lite">lite</span></div>
                    </div>
                    <hr className="header-line"/>
                </header>

                <div className="form-container">
                    <RegistrationComponent handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                </div>
                
            </Fragment>
                
            
            
        )
    }
}
export default RegistrationPage