import React, { Component } from 'react';
import './Signup.css';
import withNavigate from './withNavigate';  // Import the HOC

class Signup extends Component {
    state = {
        firstName: "",
        email: "",
        password: "",
        phoneNumber: "",
        errors: {
            firstName: "",
            email: "",
            password: "",
            phoneNumber: ""
        }
    }

    getFirstName = (event) => {
        this.setState({ firstName: event.target.value });
    }

    getEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    getPassword = (event) => {
        this.setState({ password: event.target.value });
    }

    getPhoneNumber = (event) => {
        this.setState({ phoneNumber: event.target.value });
    }

    validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "firstName":
                if (!value) {
                    error = "First name is required";
                }
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = "Invalid email format";
                }
                break;
            case "password":
                if (value.length < 6) {
                    error = "Password must be at least 6 characters long";
                }
                break;
            case "phoneNumber":
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(value)) {
                    error = "Invalid phone number";
                }
                break;
            default:
                break;
        }
        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [name]: error
            }
        }));
    }

    handleBlur = (event) => {
        const { name, value } = event.target;
        this.validateField(name, value);
    }

    submitForm = async (event) => {
        event.preventDefault();
        const { firstName, email, password, phoneNumber, errors } = this.state;

        for (const key in errors) {
            if (errors[key]) {
                alert("Please fix the errors in the form before submitting");
                return;
            }
        }

        const newUserData = {
            user_firstname: firstName,
            user_email: email,
            user_password: password,
            user_phone: phoneNumber,
            user_lastname: "Mahi",
            user_city: "Hyderabad",
            user_zipcode: "500015"
        };

        const url = "https://syoft.dev/Api/user_registeration/api/user_registeration";
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            localStorage.setItem('userData', JSON.stringify(newUserData));
            this.props.navigate('/dashboard');  // Use the navigate function provided by the HOC
        } catch (error) {
            console.error('Error:', error);
        }
    }

    clickedSignIn = () => {
        this.props.navigate('/Login');
    }

    render() {
        const { firstName, email, password, phoneNumber, errors } = this.state;

        return (
            <div className="signUpContainer">
                <form className="signUpForm" onSubmit={this.submitForm}>
                    <div className="formStyle">
                        <label htmlFor='firstname'>First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstName"
                            value={firstName}
                            onChange={this.getFirstName}
                            onBlur={this.handleBlur}
                            required
                            className='InputItem1'
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="formStyle">
                        <label htmlFor='email'>Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.getEmail}
                            onBlur={this.handleBlur}
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="formStyle">
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.getPassword}
                            onBlur={this.handleBlur}
                            required
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="formStyle">
                        <label htmlFor='numbers'>Phone</label>
                        <input
                            type="text"
                            id="number"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={this.getPhoneNumber}
                            onBlur={this.handleBlur}
                            required
                        />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>
                    <button type="submit">Sign Up</button>
                    <p> Already have an account? <span className='signInItem' onClick = {this.clickedSignIn} > sign in </span> </p>
                </form>
            </div>
        );
    }
}

export default withNavigate(Signup);
