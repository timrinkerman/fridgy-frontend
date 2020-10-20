import React, { Component, Fragment } from "react";
import axios from 'axios';
import Registration from "../auth/RegistrationComponent"
import { NavLink } from 'react-router-dom'
import LoginComponent from "../auth/LoginComponent";


class LoginPage extends Component{
constructor(props){
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
}
    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push("/userpage");  
    }

    

    render(){
        return(
            <Fragment>
                <header className="header-component">
                    <NavLink to="/" className='home-login' ><span className="login-text"><strong>Home</strong></span></NavLink>
                    <div className="content">
                    <div className="fridgy-title">Fridgy</div>
                    </div>
                    <hr className="header-line"/>
                </header>

                <div className="form-container">
                    <LoginComponent handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    <NavLink to="/registration" className='registration'>Don't have credentials? Sign up</NavLink>
                    <br></br>
                    {/* <button onClick={() => this.handleLogoutClick()}>Logout</button> */}
                </div>
            </Fragment>

        )
    }
}
export default LoginPage