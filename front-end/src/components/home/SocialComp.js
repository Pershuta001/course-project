import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import ScrollArea from "react-scrollbar";
import Grid from "@material-ui/core/Grid";
import {ButtonBase} from "@material-ui/core";
import Api from "../../api/Api";

const useStyles = makeStyles(() => ({
    row: {
        margin: "5px",
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
    buttonText: {
        color: "white",
        fontSize: "15px"
    }
}));

export default function Social(props) {

    const classes = useStyles();
    const [socials, setSocials] = useState(props.socials);
    const [listItems, setListItems] = useState(socials.map((social, index) =>

        <Grid key={index} container item xs={12} className={classes.row}>
            <Grid className={classes.labelStyle}>
                <span>{social}</span>
            </Grid>
            <Grid>
                <ButtonBase className={classes.buttonStyle}
                            onClick={() => deleteSocial(index)}>
                    <span className={classes.buttonText}>Del</span>
                </ButtonBase>
            </Grid>
        </Grid>));

    function deleteSocial(index) {
        const social = socials[index];
       // console.log('/profile/social/delete/' + social)
        Api.delete('/profile/social/delete/' + social)
            .then(originalPromiseResult => {
                console.log(originalPromiseResult)
                setSocials(props.socials.splice(index, 1));
                init();

                // showSnack("success", "You successfully signed up !");
            })
            .catch(rejectedValueOrSerializedError => {
                // showSnack("error", "Wrong password or something :/");
                console.log(rejectedValueOrSerializedError)
            })

    }

    function init() {
        setListItems(socials.map((social, index) =>

            <Grid key={index} container item xs={12} className={classes.row}>
                <Grid className={classes.labelStyle}>
                    <span>{social}</span>
                </Grid>
                <Grid>
                    <ButtonBase className={classes.buttonStyle}
                                onClick={() => deleteSocial(index)}>
                        <span className={classes.buttonText}>Del</span>
                    </ButtonBase>
                </Grid>
            </Grid>
        ))
    }


    return (
        <ScrollArea
            speed={0.8}
            className={classes.scrollArea}
        >
            {listItems}
        </ScrollArea>

    );
}