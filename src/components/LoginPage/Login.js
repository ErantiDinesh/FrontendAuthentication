import './Login.css'
import withNavigate from '../SignupPage/withNavigate'
import {Component} from 'react'

class Login extends Component {

    state = {userName: "", password: "", nameError: "", passwordError: ""}

    getUserName = (event) => {
        this.setState({userName: event.target.value})
    }

    getPassword = (event) => {
        this.setState({password: event.target.value})
    }

    checkUserName = (event) => {
        if (event.target.value === "") {
            this.setState({nameError: "Please Enter Email"})
        } else {
            this.setState({nameError: ""})
        }
    }

    checkPassword = (event) => {
        if (event.target.value === "") {
            this.setState({passwordError: "Please Enter Password"})
        } else {
            this.setState({passwordError: ""})
        }
    }

    clickedSignUp = () => {
        this.props.navigate('/');
    }

    submitLoginDetails = async (event) => {
        event.preventDefault()
        const {userName, password} = this.state
        const url = "https://syoft.dev/Api/userlogin/api/userlogin"
        const userDetails = {
            user_email: userName,
            user_password: password
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(response)
        console.log(data)

        if(data.msg === "User found") {
            const displayData = data.user_data[0]
            console.log(displayData)
            localStorage.setItem("userData", JSON.stringify(displayData))
            this.props.navigate('/dashboard');

        }
        

    }

    render() {
        const {userName, password, nameError, passwordError} = this.state

        return(
            <div className='signUpContainer'>
                <form className="signUpForm" onSubmit={this.submitLoginDetails}>
                    <div className="formStyle">
                        <label htmlFor='username'> User Email*</label>
                        <input
                            type="text"
                            id="username"
                            value={userName}
                            onChange={this.getUserName}
                            onBlur={this.checkUserName}
                            required
                            className='InputItem1'
                        />
                        <p className='error'> {nameError} </p>
                    </div>
                    <div className="formStyle">
                        <label htmlFor='passwordItem'>Password*</label>
                        <input
                            type="password"
                            id="passwordItem"
                            value={password}
                            onChange={this.getPassword}
                            onBlur={this.checkPassword}
                            required
                        />
                        <p className='error'> {passwordError} </p>        
                    </div>
                    <button type="submit">Login</button>
                    <p> Don't have an account? <span className='signInItem' onClick = {this.clickedSignUp} > sign Up </span> </p>
                </form>
            </div>
        )
    }
}

export default withNavigate(Login);