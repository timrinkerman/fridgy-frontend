import React, { Component } from 'react';
import axios from 'axios';


class RegistrationComponent extends Component {
    state = { 
        email: "",
        password: "",
        password_confirmation: "",
        registrationErrors: "",
     }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        
        axios.post("http://localhost:3001/registrations", {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        },
        { withCredentials: true }
        )
        .then(response => {
            if (response.data.status === 'created'){
                this.props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {console.log("registration error", error)})
        event.preventDefault();
    }

    

    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                <br></br>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                <br></br>
                <input type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
                <br></br>
                <button className="auth-button" type='submit'><span className="auth-button-text"><strong>Register</strong></span></button>
                </form>
            </div>
         );
    }
}
 
export default RegistrationComponent;