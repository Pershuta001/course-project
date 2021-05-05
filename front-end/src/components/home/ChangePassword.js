import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    textField: {
        marginTop: "5px",
        width: "350px",
        height: "50px"
    },
    button: {
        backgroundColor: "#4CBBA0",
        width: "200px",
        height: "50px",
        marginTop: "20px",
        marginLeft: "20px",
        borderRadius: "25px"
    },
    center: {
        marginLeft:"100px"
    }
}));
export default function ChangePassword(props) {

    const classes = useStyles();
    return (
        <Grid>
            <div className={props.classes.fieldsMargin}>
                <TextField type="password"
                           className={classes.textField}
                           placeholder="Old password"
                />
            </div>
            <div className={props.classes.fieldsMargin}>
                <TextField type="password"
                           className={classes.textField}
                           placeholder="New password"
                />
            </div>
            <div className={props.classes.fieldsMargin}>
                <TextField type="password"
                           className={classes.textField}
                           placeholder="New password again"
                />
            </div>
            <div className={classes.center}>
                <ButtonBase className={classes.button}>
                    <span className={props.classes.buttonText}>
                        UPDATE
                    </span>
                </ButtonBase>
            </div>
        </Grid>
    );
}