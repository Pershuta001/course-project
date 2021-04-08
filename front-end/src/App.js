import React from 'react';
import './App.css';

function App() {

    class Container extends React.Component {

        state = {
            login: true,
            signUpForm: {
                name: "",
                email: "",
                password: ""
            },
            signInForm: {
                email: "",
                password: ""
            }
        };

        render() {
            return <div className={`container ${this.state.login ? '' : 'right-panel-active'}`} id="container">

                <SignUp/>
                <SignIn/>
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

    function SignIn() {
        return (
            <div className="form-container sign-in-container">
                <p className="brand-header">Finder</p>
                <div>
                    <form action="#">
                        <h1 className="sign-header">Sign in to Finder</h1>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Sign In</button>
                    </form>
                </div>
            </div>);
    }

    function SignUp() {
        return <div className="form-container sign-up-container">
            <form action="#">
                <h1 className="sign-header">Create Account</h1>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Password again"/>
                <button>Sign Up</button>
            </form>
        </div>;
    }

    return <Container/>;
}


export default App;