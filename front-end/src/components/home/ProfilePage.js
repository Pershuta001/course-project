import React from 'react';
import Navbar from "./NavbarComp";
import {makeStyles} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import ProfileComp from "./ProfileComp";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

function Profile() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div style={{marginTop:20}}><Navbar/></div>
            <div style={{marginTop:20}}><ProfileComp/></div>
        </div>
    )
}

export default Profile;