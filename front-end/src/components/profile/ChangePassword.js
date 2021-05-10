import TextField from "@material-ui/core/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {
    validatePassword,
    validatePasswordRep
} from "../utils/Validation";
import Api from "../../api/Api";

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
        marginLeft: "100px"
    },
    form: {
        margin: "0",
        width: "500px",
    }
}));
export default function ChangePassword(props) {


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRep, setNewPasswordRep] = useState("");

    const [validPass, setValidPass] = useState(true);
    const [validNewPass, setValidNewPass] = useState(true);
    const [validNewPassRep, setValidNewPassRep] = useState(true);

    const classes = useStyles();

    function validateFields() {

        const isValidPassword = validatePassword(oldPassword) === true;
        setValidPass(isValidPassword);

        const isValidNewPassword = validatePassword(newPassword) === true;
        setValidNewPass(isValidNewPassword);

        const isValidNewPasswordRep = validatePasswordRep(newPassword, newPasswordRep) === true;
        setValidNewPassRep(isValidNewPasswordRep);

        return isValidPassword && isValidNewPassword && isValidNewPasswordRep;
    }

    function doChangePass(e) {
        e.preventDefault();
        if (validateFields()) {
           Api.put('/profile/password/change', {
                oldPass: oldPassword,
                newPass: newPassword,
            })
                .then(originalPromiseResult => {
                    console.log(originalPromiseResult)
                    // showSnack("success", "You successfully signed up !");
                })
                .catch(rejectedValueOrSerializedError => {
                    // showSnack("error", "Wrong password or something :/");
                    console.log(rejectedValueOrSerializedError)
                })
        }
    }

    return (
        <Grid>
            <form noValidate className={classes.form}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Old password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setOldPassword(e.target.value)}
                    helperText={
                        validPass ? '' : validatePassword(oldPassword)
                    }
                    error={!validPass}
                />

                <TextField
                    required
                    fullWidth
                    name="password"
                    label="New password"
                    type="password"
                    id="passwordNew"
                    autoComplete="current-password"
                    onChange={e => setNewPassword(e.target.value)}
                    helperText={
                        validNewPass ? '' : validatePassword(newPassword)
                    }
                    error={!validNewPass}
                />
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="New password again"
                    type="password"
                    id="passwordRep"
                    autoComplete="current-password"
                    onChange={e => setNewPasswordRep(e.target.value)}
                    helperText={
                        validNewPassRep ? '' : validatePasswordRep(newPassword, newPasswordRep)
                    }
                    error={!validNewPassRep}

                />
                <ButtonBase onClick={doChangePass} className={classes.button}>
                    <span className={props.classes.buttonText}>
                        Update
                    </span>
                </ButtonBase>
            </form>
        </Grid>
    );
}