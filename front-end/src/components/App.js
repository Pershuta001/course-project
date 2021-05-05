import React from 'react';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"
import '../styles/App.css';
import './SignInUpPage'
import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/Auth";
import SignInUpPage from "./SignInUpPage";
import Home from "./home/Home";
import Profile from "./home/ProfilePage";
import {PrivateRoute} from "./utils/PrivateRoute";

function App() {

    const currentUser = useSelector(selectUser);

    return <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path='/signin' component={SignInUpPage}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/profile' component={Profile}/>
                <Redirect from='/' to='/signin'/>
            </Switch>
        </BrowserRouter>
    </div>;
}


export default App;