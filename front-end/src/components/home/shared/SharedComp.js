import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/auth/Auth";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Radio from "@material-ui/core/Radio";
import Api from "../../../api/Api";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioButtonGroup from "./RadioButtonGroup";

const useStyles = makeStyles(() => ({
    row: {
        marginBottom: "20px",
        padding: "0",
        border: "3px solid #E6EEEE",
        '&:hover': {
            background: "#E6EEEE",
        },
    },
    large: {
        width: "100px",
        height: "100px",
        backgroundColor: "#3D8A78",
    },
    label: {
        fontSize: "50px"
    },
    subtextStyle: {
        margin: "10px",
        color: "#4CBBA0",
        fontSize: "20px"
    },
    textStyle: {
        color: "#4CBBA0",
        fontSize: "25px"
    },
    gridWidth: {
        width: "50px"
    },
    largeIcon: {
        width: "100px",
        height: "100px",
    },
    popup: {
        width: "400px"
    }

}));

let rating = 0;
let karma = 0;

export default function SharedComp(props) {


    function handleKarma(value, uuid) {
        karma = value
        console.log(karma);
        console.log(uuid);
        sendFeedback(uuid)
    }

    function handleRating(value) {
        rating = value
        console.log(rating);

    }

    function remElem(uuid) {
        document.getElementById(uuid).remove()

    }

    const sendFeedback = (uuid) => {
        Api.post("/reply/confirm", {
            uuid: uuid
        }).then().catch()
        //  document.getElementById('pop' + uuid).remove()

    };

    function contactComp(reply) {
        console.log(reply)
        return (
            <Grid key={reply.replyId} id={reply.replyId} item xs={12} sm container className={classes.row} spacing={3}>
                <Grid>
                    <Avatar
                        className={classes.large}>
                        <span className={classes.label}>{reply.marker.userView.userFirstname.charAt(0)}</span>
                    </Avatar>
                </Grid>
                <Grid item xs={5} container direction="column" spacing={2} zeroMinWidth>
                    <Grid container direction="column" spacing={1}>
                        <Grid>
                            <span
                                className={classes.textStyle}>{'Host: ' + reply.marker.userView.userFirstname + ' ' + reply.marker.userView.userLastname}</span>

                        </Grid>
                        <Grid>
                            <span
                                className={classes.textStyle}>{' Rating: ' + reply.marker.userView.rating}</span>

                        </Grid>

                        <Grid>
                            <span
                                className={classes.textStyle}>{' Karma: ' + reply.marker.userView.karma}</span>
                        </Grid>

                        <Grid>
                            <span className={classes.textStyle}>
                                 {'Tags: ' + reply.marker.tags.join(', ')}
                             </span>
                        </Grid>
                        <Grid>
                             <span className={classes.textStyle}>
                                {'Description: ' + reply.marker.description}
                             </span>
                        </Grid>
                        <Grid>
                             <span className={classes.textStyle}>
                                {'Price range: ' + reply.marker.minPrice + '-' + reply.marker.maxPrice}
                             </span>
                        </Grid>
                        <Grid>
                             <span className={classes.textStyle}>
                                {'Socials: ' + reply.ownerSocials.join(', ')}
                             </span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid>
                    <Avatar
                        className={classes.large}>
                        <span className={classes.label}>{reply.replier.userFirstname.charAt(0)}</span>
                    </Avatar>
                </Grid>
                <Grid item xs={5} container direction="column" spacing={2}>
                    <Grid>
                 <span className={classes.textStyle}>
                    {'Replier: ' + reply.replier.userFirstname + ' ' + reply.replier.userLastname}
                 </span>
                    </Grid>
                    <Grid>
                 <span className={classes.textStyle}>
                    {'Rating: ' + reply.replier.rating}
                 </span>
                    </Grid>
                    <Grid>
                 <span className={classes.textStyle}>
                    {'Karma: ' + reply.replier.karma}
                 </span>
                    </Grid>
                    <Grid>
                        <span className={classes.textStyle}>
                            {'Socials: ' + reply.replierSocials.join(', ')}
                        </span>
                    </Grid>
                </Grid>
                <Grid className={classes.gridWidth}>

                    <Button className={classes.largeIcon}>
                        <DeleteIcon/>
                    </Button>
                    <Popup
                        trigger={<Button className={classes.largeIcon}>
                            <CheckIcon/>
                        </Button>}
                        position="left top"
                        onClose={() => remElem(reply.replyId)}
                    >
                        <RadioButtonGroup rating={handleRating} karma={e => handleKarma(e, reply.replyId)}
                        />
                    </Popup>
                </Grid>
            </Grid>)
    }


    const user = useSelector(selectUser)
    const classes = useStyles();
    const [contacts] = useState(props.contacts);
    const [listItems] = useState(contacts.map((contact) => contactComp(contact)));

    return (
        <div>
            {listItems}
        </div>);
}