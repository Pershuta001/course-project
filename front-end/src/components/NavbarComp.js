import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {ExitToApp, PinDrop} from "@material-ui/icons";


import {
    signOut,
    selectUser
} from '../features/auth/Auth'
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        minWidth: 80
    },
    exitIcon: {
        paddingRight: 5,
        color: '#FFF'
    },
    exitLogo: {
        backgroundColor: "#3D8A78",
    },
    background: {
        backgroundColor: "#4CBBA0"
    },
    alignToRight: {
        marginLeft: "auto"
    },
    topnav: {
        backgroundColor: '#333',
        overflow: "hidden"
    }
}));

const Navbar = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const history = useHistory();

    const performSignOut = () => {
        dispatch(signOut());
        history.push("/signin");
    }

    return (
        <AppBar position="static" className={classes.background}>
            <Toolbar>
                <Button color={"inherit"}
                        href={'/home'}
                        className={classes.menuButton}>
                    <PinDrop className={classes.icon}/>
                    <span style={{fontSize:"large"}}>Home</span>
                </Button>

                <Button color={"inherit"}
                        href={'/markers'}
                        className={classes.menuButton}>
                    <span style={{fontSize:"large"}}>Markers</span>
                </Button>

                <div className={classes.alignToRight}>
                    <Button href={'/profile'} key={'/profile'}>
                        <span>
                            <Avatar
                                className={classes.exitLogo}>{user.name.charAt(0)}
                            </Avatar>
                        </span>
                    </Button>
                    <Button onClick={performSignOut}
                            color={"inherit"}
                    >
                        <ExitToApp className={classes.exitIcon}/>
                        <span style={{fontSize:"large"}}>Logout</span>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar