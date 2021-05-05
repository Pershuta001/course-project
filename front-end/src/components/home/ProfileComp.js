import React from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/Auth";
import ScrollArea from 'react-scrollbar';
import Social from "./SocialComp";
import ChangePassword from "./ChangePassword";

const useStyles = makeStyles(() => ({
    container: {
        margin: "0",
        position: "relative",
        left: "25%"
    },
    root: {
        flexGrow: 1,
    },
    fieldsMargin: {
        marginLeft: "40px",
    },
    paper: {
        margin: 'auto',
        maxWidth: 'auto',
    },
    buttonText: {
        color: "white",
        fontSize: "15px"
    },
    img: {
        width: "100%",
        height: "auto"
    },
    logo: {
        margin: "20px",
        position: "relative",
        width: "200px",
        height: "200px",
        overflow: "hidden",
        borderRadius: "50%"
    },
    buttonStyle: {
        backgroundColor: "#4CBBA0",
        width: "80px",
        height: "32px",
    },
    changeLogoButton: {
        backgroundColor: "#4CBBA0",
        width: "200px",
        height: "50px",
        marginTop: "20px",
        marginLeft: "20px",
        borderRadius: "25px"
    },

    labelStyle: {
        color: "#4CBBA0",
        fontSize: "20px",
        marginTop: "10px"
    },
    scrollArea: {
        backgroundColor: "grey",
        width: "400px",
        height: "200px"
    },
    textField:{
        width: "350px"
    }


}));

export default function ProfileComp() {

    const classes = useStyles();

    const socials = ["instagram", "telegram","facebook","chat"];

    const user = useSelector(selectUser);

    return (
        <Paper className={classes.paper}>
            <Grid container item xs={12}>
                <Grid item xs={3} container direction="column">
                    <div className={classes.logo}>
                        <img className={classes.img} alt="complex"
                             src="https://i.pinimg.com/originals/6f/aa/0e/6faa0e4f46425b297b4f2603a19fdbc3.jpg"/>
                    </div>
                    <ButtonBase className={classes.changeLogoButton}>
                        <span className={classes.buttonText}>Change logo</span>
                    </ButtonBase>
                </Grid>
                <Grid item xs={9}>
                    <Grid item xs container direction="column" className={classes.container} spacing={2}>
                        <Grid>
                            <Typography className={classes.labelStyle}>
                                Your first name:
                            </Typography>
                            <div className={classes.fieldsMargin}>
                                <TextField placeholder={user.name} className={classes.textField}/>
                                <ButtonBase className={classes.buttonStyle}>
                                <span className={classes.buttonText}>
                                    Update
                                </span>
                                </ButtonBase>
                            </div>
                        </Grid>
                        <Grid>
                            <Typography className={classes.labelStyle}>
                                Your last name:
                            </Typography>
                            <div className={classes.fieldsMargin}>
                                <TextField placeholder={user.lastName} className={classes.textField}/>
                                <ButtonBase className={classes.buttonStyle}>
                                <span className={classes.buttonText}>
                                    Update
                                </span>
                                </ButtonBase>
                            </div>
                        </Grid>
                        <Grid>
                            <Typography className={classes.labelStyle}>
                                Socials:
                            </Typography>
                            <div className={classes.fieldsMargin}>
                                <Social socials={socials}/>
                            </div>
                        </Grid>
                        <Grid>
                            <Typography className={classes.labelStyle}>
                                Add social:
                            </Typography>
                            <div className={classes.fieldsMargin}>
                                <TextField className={classes.textField}/>
                                <ButtonBase className={classes.buttonStyle}>
                                <span className={classes.buttonText}>
                                    ADD
                                </span>
                                </ButtonBase>
                            </div>
                        </Grid>
                        <Grid>
                            <Typography className={classes.labelStyle}>
                                Change password:
                            </Typography>
                            <ChangePassword classes = {classes}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>);

}