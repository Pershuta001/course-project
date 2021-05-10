import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/auth/Auth";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    row: {
        marginBottom: "20px",
        padding: "0",
        height: "100px",
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
    gridWidth:{
        width:"50px"
    },
    largeIcon: {
        width: "100px",
        height: "100px",
    },

}));

export default function SharedComp(props) {

    function contactComp (contact) {
        return( <Grid key={contact.id} item xs={12} sm container  className={classes.row} spacing={2}>
            <Grid>
                <Avatar
                    className={classes.large}
                    rounded>
                    <span className={classes.label}>{user.name.charAt(0)}</span>
                </Avatar>
            </Grid>
            <Grid item xs={5} container direction="column" spacing={2} zeroMinWidth>
                <Grid item xs >
                 <span className={classes.textStyle}>
                    {contact.username}
                 </span>
                </Grid>
                <Grid item xs>
                 <span className={classes.subtextStyle}>
                    Socials:
                 </span>
                 <span className={classes.subtextStyle}>
                    {contact.socials.join(', ')}
                 </span>
                </Grid>
            </Grid>
            <Grid className={classes.gridWidth}>
                <Button className={classes.largeIcon}>
                    <DeleteIcon/>
                </Button>
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