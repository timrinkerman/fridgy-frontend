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
        
        axios.post("https://big-fridgy.herokuapp.com/registrations", {
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
            
            // <div className="form-container">
                
            <div className="form-group">
                <form onSubmit={this.handleSubmit}>
                <input  class="form-input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                <br></br>
                <input  class="form-input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                <br></br>
                <input   class="form-input" type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
                <br></br>
                <button className="btn-primary" type='submit'><span className="auth-button-text"><strong>Register</strong></span></button>
                </form>
            </div>
           // </div>
         );
    }
}
 
export default RegistrationComponent;