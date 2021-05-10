import React from 'react';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from "react-router-dom"
import '../styles/App.css';
import './SignInUpPage'
import {useSelector} from "react-redux";
import {selectUser} from "../features/auth/Auth";
import SignInUpPage from "./SignInUpPage";
import Home from "./home/Home";
import Profile from "./profile/ProfilePage";
import {PrivateRoute} from "./utils/PrivateRoute";
import Markers from "./markers/Markers";

function App() {

    const currentUser = useSelector(selectUser);

    return <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path='/signin' component={SignInUpPage}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/markers' component={Markers}/>
                <Route exact path='/profile' component={Profile}/>
                <Redirect from='/' to='/signin'/>
            </Switch>
        </BrowserRouter>
    </div>;
}


export default App;