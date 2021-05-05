import React from 'react';
import {makeStyles} from "@material-ui/styles";
import ScrollArea from "react-scrollbar";
import Grid from "@material-ui/core/Grid";
import {ButtonBase} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    row: {
        width: "400px",
        '&:hover': {
            background: "#E6EEEE",
        },
    },
    labelStyle: {
        width: "350px",
        color: "#4CBBA0"
    },
    buttonStyle: {
        width: "50px",
        height: "20px",
        backgroundColor: "#4CBBA0"
    },
    scrollArea: {
        width: "400px",
        height: "200px"
    },
    buttonText:{
        color: "white",
        fontSize: "15px"
    }
}));

export default function Social(props) {

    const classes = useStyles();

    const listItems = props.socials.map((social) =>

            <Grid container item xs={12} className={classes.row}>
                <Grid className={classes.labelStyle}>
                    <span>{social}</span>
                </Grid>
                <Grid>
                    <ButtonBase className={classes.buttonStyle}>
                        <span className={classes.buttonText}>Del</span>
                    </ButtonBase>
                </Grid>
            </Grid>

    );


    return (
        <ScrollArea
            speed={0.8}
            className={classes.scrollArea}
        >
            {listItems}
        </ScrollArea>

    );
}