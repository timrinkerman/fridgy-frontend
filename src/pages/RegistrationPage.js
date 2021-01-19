import React, { Component, Fragment } from "react";
import RegistrationComponent from "../auth/RegistrationComponent";
import {NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
class RegistrationPage extends Component{

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push("/userpage");  
    }

    render(){
        return(
            <Fragment>

                <header className="wrapper">

                <a href="" className="logo-wrap"><img className="logo" alt=""/></a>
                    <RegistrationComponent handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    <NavLink to="/login" className='login' ><span className="login-text"><strong>Login</strong></span></NavLink>
                </header>
            </Fragment>
                
            
            
        )
    }
}
export default RegistrationPage