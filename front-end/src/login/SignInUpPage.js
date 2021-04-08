import React from "react";
import axios from "axios";


function SignInUpPage() {

    class Container extends React.Component {

        state = {
            login: true,
            signUpForm: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                passwordRep: ""
            },
            signInForm: {
                email: "",
                password: ""
            },
            token: ""
        };

        constructor(props) {
            super(props);
            this.doLogin = this.doLogin.bind(this);
            this.doSignUp = this.doSignUp.bind(this);
        }

        doLogin(e) {
            axios.post('http://192.168.0.103:8080/login', {
                login: this.state.signInForm.email,
                password: this.state.signInForm.password
            })
                .then(res => {
                    console.log(res.headers.authorization);
                })
            e.preventDefault();
        };

        doSignUp(e) {
            const data = {login: this.state.signUpForm.email,
                password: this.state.signUpForm.password,
                firstName: this.state.signUpForm.firstName,
                lastName: this.state.signUpForm.lastName,
                phone1: this.state.signUpForm.phone};
            console.log(data);
            axios.post('http://192.168.0.103:8080/sign-up', {
                login: this.state.signUpForm.email,
                password: this.state.signUpForm.password,
                firstName: this.state.signUpForm.firstName,
                lastName: this.state.signUpForm.lastName,
                phone1: this.state.signUpForm.phone
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err))
            e.preventDefault();
        }
        render() {
            return <div className={`container ${this.state.login ? '' : 'right-panel-active'}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={this.doSignUp}>
                        <h1 className="sign-header">Create Account</h1>
                        <input type="text"
                               placeholder="First name"
                               value={this.state.signUpForm.firstName}
                               onChange={(value) => this.setState({
                                   signUpForm: {
                                       firstName: value.target.value,
                                       lastName: this.state.signUpForm.lastName,
                                       email: this.state.signUpForm.email,
                                       phone: this.state.signUpForm.phone,
                                       password: this.state.signUpForm.password,
                                       passwordRep: this.state.signUpForm.passwordRep
                                   }
                               })}
                               required={true}
                        />
                        <input type="text"
                               placeholder="Last name"
                               value={this.state.signUpForm.lastName}
                               onChange={(value) => this.setState({
                                   signUpForm: {
                                       firstName: this.state.signUpForm.firstName,
                                       lastName: value.target.value,
                                       email: this.state.signUpForm.email,
                                       phone: this.state.signUpForm.phone,
                                       password: this.state.signUpForm.password,
                                       passwordRep: this.state.signUpForm.passwordRep
                                   }
                               })}
                               required={true}
                        />
                        <input type="email"
                               placeholder="Email"
                               value={this.state.signUpForm.email}
                               onChange={(value) => this.setState({
                                   signUpForm: {
                                       firstName: this.state.signUpForm.firstName,
                                       lastName: this.state.signUpForm.lastName,
                                       email: value.target.value,
                                       phone: this.state.signUpForm.phone,
                                       password: this.state.signUpForm.password,
                                       passwordRep: this.state.signUpForm.passwordRep
                                   }
                               })}
                               required={true}
                        />
                        <input type="text"
                               placeholder="Phone"
                               value={this.state.signUpForm.phone}
                               onChange={(value) => this.setState({
                                   signUpForm: {
                                       firstName: this.state.signUpForm.firstName,
                                       lastName: this.state.signUpForm.lastName,
                                       email: this.state.signUpForm.email,
                                       phone: value.target.value,
                                       password: this.state.signUpForm.password,
                                       passwordRep: this.state.signUpForm.passwordRep
                                   }
                               })}
                               required={true}
                        />
                        <input type="password"
                               placeholder="Password"
                               value={this.state.signUpForm.password}
                               onChange={(value) => this.setState({
                                   signUpForm: {
                                       firstName: this.state.signUpForm.firstName,
                                       lastName: this.state.signUpForm.lastName,
                                       email: this.state.signUpForm.email,
                                       phone: this.state.signUpForm.phone,
                                       password: value.target.value,
                                       passwordRep: this.state.signUpForm.passwordRep
                                   }
                               })}
                               required={true}
                        />
                        <input type="password"
                               placeholder="Password again"
                               value={this.state.signUpForm.passwordRep}
                               onChange={(value) => this.setState({
                                   signUpForm: {
                                       firstName: this.state.signUpForm.firstName,
                                       lastName: this.state.signUpForm.lastName,
                                       email: this.state.signUpForm.email,
                                       phone: this.state.signUpForm.phone,
                                       password: this.state.signUpForm.password,
                                       passwordRep: value.target.value
                                   }
                               })}
                               required={true}
                        />
                        <button >Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <p className="brand-header">Finder</p>
                    <div>
                        <form onSubmit={this.doLogin}>
                            <h1 className="sign-header">Sign in to Finder</h1>
                            <input type="email"
                                   placeholder="Email"
                                   value={this.state.signInForm.email}
                                   onChange={(value) => this.setState({
                                       signInForm: {
                                           email: value.target.value,
                                           password: this.state.signInForm.password,
                                       }
                                   })}
                                   required={true}
                            />
                            <input type="password"
                                   placeholder="Password"
                                   value={this.state.signInForm.password}
                                   onChange={(value) => this.setState({
                                       signInForm: {
                                           email: this.state.signInForm.email,
                                           password: value.target.value,
                                       }
                                   })}
                                   required={true}
                            />
                            <button>Sign In</button>
                        </form>
                    </div>
                </div>
                <div className="overlay-container ">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Hello friend!</h1>
                            <p>Already have an account? Go to sign in page and log in to your account</p>
                            <div className="panel">
                                <button onClick={() => {
                                    this.setState({
                                        login: !this.state.login
                                    });
                                }} className="ghost" id="signIn">Sign In
                                </button>
                            </div>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hi, mate!</h1>
                            <p>We are glad to see you. Go to sign up page to become a part of our community</p>
                            <button onClick={() => {
                                this.setState({
                                    login: !this.state.login
                                });
                            }} className="ghost" id="signUp">Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        };
    }
    return <Container/>;
}

export default SignInUpPage;