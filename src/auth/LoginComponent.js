import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


class LoginComponent extends Component {
    state = { 
        email: "",
        password: "",
        loginErrors: "",
     }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        },
        { withCredentials: true }
        )
        .then(response => {
            if (response.data.logged_in){
                this.props.handleCheckLogin()
                this.props.handleSuccessfulAuth(response.data); 
            }
        })
        .catch(error => {console.log("login error", error)})
        event.preventDefault();
    }

    render() { 
        return ( 
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                <br></br>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                <br></br>
                <button className="auth-button" type='submit'><span className="auth-button-text"><strong>Login</strong></span></button>
                </form>
            </div>
         );
    }
}
 
export default LoginComponent;