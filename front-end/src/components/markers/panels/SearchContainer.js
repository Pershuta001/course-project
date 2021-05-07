import React from "react";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import TagsComp from "./TagsComp";

const useStyles = makeStyles(() => ({
    textField: {
        boxSizing: "border-box",
        backgroundColor: "white",
        width: "310px",
        margin: "5px"

    },
    textField2: {
        boxSizing: "border-box",
        backgroundColor: "white",
        width: "145px",
        margin: "5px"

    },
    resize: {
        fontSize: "15px",
        fontFamily: 'Aldrich, sans-serif'
    },
    header: {
        fontSize: "20px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    header2: {
        fontSize: "20px",
        color: "white",
        margin: '15px 10px'
    },
    spaceLabel: {
        fontSize: "20px",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        backgroundColor: "#3D8A78",

    },
    buttonStyle: {
        margin:"40px 50px",
        padding:"10px 10px",
        backgroundColor: "#4CBBA0",
        borderRadius: "20px",
        borderColor: "#ffffff"
    }

}));

export default function SearchContainer(props) {

    const classes = useStyles();


    return (
        <Grid className={classes.background} direction="column">
            <Grid>
                <span className={classes.header}>Find markers</span>
            </Grid>
            <Grid>
                <TagsComp tags={props.tags}/>
            </Grid>
            <Grid direction="row">
                <Grid>
                    <span className={classes.header2}>min/max range in km:</span>
                </Grid>
                <Grid>
                    <TextField
                        id="min"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        className={classes.textField2}
                    />
                    <span className={classes.spaceLabel}>:</span>
                    <TextField
                        id="max"
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                        }}
                        className={classes.textField2}
                    />
                </Grid>
            </Grid>
            <Grid>
                <Button className={classes.buttonStyle}>
                    <span className={classes.header}>
                        Find Markers
                    </span>
                </Button>
            </Grid>
        </Grid>
    );
}