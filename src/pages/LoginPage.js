import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom'
import LoginComponent from "../auth/LoginComponent";
import logo from '../assets/logo.png'

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
             
               
                    {/* <NavLink to="/" className='home-login' ><span className="login-text"><strong>Home</strong></span></NavLink> */}
                    {/* <div className="content">
                    <div className="fridgy-title">Fridgy</div>
                    <a href="" className="logo"><img className="logo" src={logo} alt=""/></a>
                    </div>
                    <hr className="header-line"/> */}
              

                <div className="wrapper">
                <a href="a place" className="logo-wrap"><img className="logo" src={logo} alt=""/></a>
                    
                <h3 className="title">Build recipes with what you already have in your Fridge!</h3>
	            <p className="desc">Sign in</p>
                
                    <LoginComponent handleCheckLogin={this.props.handleCheckLogin} handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    <NavLink to="/registration" className='registration center-self'>Don't have credentials? Sign up</NavLink>
                    <br></br>
                
                </div>
               
            </Fragment>

        )
    }
}
export default LoginPage



