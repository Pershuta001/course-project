import React, {useState} from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import {
    validateEmail,
    validateName,
    validateLastname,
    validatePhone,
    validatePassword,
    validatePasswordRep
} from "./utils/Validation";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {selectStatus, signInUser} from "../features/auth/Auth";
import {unwrapResult} from "@reduxjs/toolkit";


const useStyles = makeStyles((theme) => ({
    textField: {

    },
    style: {
        color: '#4CBBA0'
    }
}));

function SignInUpPage() {

    const dispatch = useDispatch();

    const authStatus = useSelector(selectStatus);

    const [loginView, setLoginView] = React.useState(true);
    const classes = useStyles();

    //SnackBar
    // const [snackOpen, setSnackOpen] = React.useState(false);
    // const [snackSeverity, setSnackSeverity] = React.useState('success');
    // const [snackText, setSnackText] = React.useState('Mellon');
    // const showSnack = (severity, text) => {
    //     setSnackSeverity(severity);
    //     setSnackText(text);
    //     setSnackOpen(true);
    // }

    // Validation
    const [validEmail, setValidEmail] = useState(true);
    const [validName, setValidName] = useState(true);
    const [validLastname, setValidLastname] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [validPasswordRep, setValidPasswordRep] = useState(true);

    const validateSignUp = () => {

        const isValidName = validateName(name) === true;
        setValidName(isValidName);

        const isValidLastname = validateLastname(lastname) === true;
        setValidLastname(isValidLastname);

        const isValidEmail = validateEmail(email) === true;
        setValidEmail(isValidEmail);

        const isValidPhone = validatePhone(phone1) === true;
        setValidPhone(isValidPhone);

        const isValidPassword = validatePassword(password) === true;
        setValidPassword(isValidPassword);

        const isValidPasswordRep = validatePasswordRep(password, passwordRep) === true;
        setValidPasswordRep(isValidPasswordRep);

        return isValidEmail && isValidPassword && isValidName && isValidLastname && isValidPhone && isValidPasswordRep;
    }

    const validateSignIn = () => {

        const isValidEmail = validateEmail(email) === true;
        setValidEmail(isValidEmail);

        const isValidPassword = validatePassword(password) === true;
        setValidPassword(isValidPassword);

        return isValidEmail && isValidPassword;
    }

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [phone1, setPhone] = useState('');
    const [passwordRep, setPasswordRep] = useState('');

    const history = useHistory();

    const swapViews = () => {
        setName('');
        setLastname('');
        setEmail('');
        setPassword('');
        setPhone('');
        setPasswordRep('');

        setValidName(true);
        setValidLastname(true);
        setValidPhone(true);
        setValidEmail(true);
        setValidPassword(true);
        setValidPasswordRep(true);

        setLoginView(!loginView)

    }

    const doSignUp = (e) => {
        e.preventDefault();
        if (validateSignUp()) {
            axios.post('http://localhost:8080/sign-up', {
                login: email,
                password: password,
                firstName: name,
                lastName: lastname,
                phone1: phone1
            })
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    // showSnack("success", "You successfully signed up !");
                    history.push("/home");
                })
                .catch(rejectedValueOrSerializedError => {
                    // showSnack("error", "Wrong password or something :/");
                    console.log(rejectedValueOrSerializedError)
                })
        }
    }

    const doSignIn = (e) => {
        e.preventDefault();
        if (validateSignIn()) {
                dispatch(
                    signInUser({
                        login: email,
                        password: password
                    })
                ).then(unwrapResult)
                    .then(originalPromiseResult => {
                        console.log(originalPromiseResult)
                        //showSnack("success","You successfully signed up !");
                        history.push("/home");
                    })
                    .catch(rejectedValueOrSerializedError => {
                        //showSnack("error","Wrong password or something :/");
                        console.log(rejectedValueOrSerializedError)
                    })
        }
    }

    return (
        <div className={`container ${loginView ? '' : 'right-panel-active'}`} id="container">
            <div className="form-container sign-up-container">
                <form noValidate>
                    <h1 className="sign-header">Create Account</h1>
                    <TextField
                        type="text"
                        fullWidth
                        id="firstname"
                        label="First name"
                        name="first name"
                        autoComplete="name"
                        autoFocus
                        onChange={e => setName(e.target.value)}
                        helperText={validName ? '' : validateName(name)}
                        error={!validName}
                        required={true}
                        className={classes.textField}

                    />
                    <TextField
                        type="text"
                        fullWidth
                        id="lastname"
                        label="Last name"
                        name="Last name"
                        autoComplete="surname"
                        autoFocus
                        onChange={e => setLastname(e.target.value)}
                        helperText={validLastname ? '' : validateLastname(name)}
                        error={!validLastname}
                        required={true}
                    />
                    <TextField
                        type="email"
                        fullWidth
                        id="email"
                        label="Email"
                        name="Email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                        helperText={validEmail ? '' : validateEmail(name)}
                        error={!validEmail}
                        required={true}
                    />
                    <TextField
                        type="text"
                        fullWidth
                        id="phone1"
                        label="Phone"
                        name="Phone"
                        autoComplete="phone"
                        autoFocus
                        onChange={e => setPhone(e.target.value)}
                        helperText={validPhone ? '' : validatePhone(name)}
                        error={!validPhone}
                        required={true}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        helperText={
                            validPassword ? '' : validatePassword(password)
                        }
                        error={!validPassword}
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="passwordRep"
                        autoComplete="current-password"
                        onChange={e => setPasswordRep(e.target.value)}
                        helperText={
                            validPasswordRep ? '' : validatePasswordRep(password, passwordRep)
                        }
                        error={!validPasswordRep}

                    />
                    <button onClick={doSignUp}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <p className="brand-header">Finder</p>
                <div>
                    <form noValidate>
                        <h1 className="sign-header">Sign in to Finder</h1>
                        <TextField
                            margin="normal"
                            type="email"
                            fullWidth
                            id="emailLog"
                            label="Email"
                            name="Email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                            helperText={validEmail ? '' : validateEmail(name)}
                            error={!validEmail}
                            required={true}

                        />
                        <TextField required
                                   margin="normal"
                                   fullWidth
                                   name="password"
                                   label="Password"
                                   type="password"
                                   id="passwordLog"
                                   autoComplete="current-password"
                                   onChange={e => setPassword(e.target.value)}
                                   helperText={
                                       validPassword ? '' : validatePassword(password)
                                   }
                                   error={!validPassword}
                        />
                        <button onClick={doSignIn}>Sign In</button>
                    </form>
                </div>
            </div>
            <div className="overlay-container ">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Hello friend!</h1>
                        <p>Already have an account? Go to sign in page and log in to your account</p>
                        <div className="panel">
                            <button onClick={swapViews} className="ghost" id="signIn">Sign In
                            </button>
                        </div>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hi, mate!</h1>
                        <p>We are glad to see you. Go to sign up page to become a part of our community</p>
                        <button onClick={
                            swapViews} className="ghost" id="signUp">Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInUpPage;