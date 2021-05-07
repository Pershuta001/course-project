import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import ScrollArea from "react-scrollbar";
import Grid from "@material-ui/core/Grid";
import {Button, ButtonBase, Typography} from "@material-ui/core";
import Api from "../../../api/Api";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/auth/Auth";
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(() => ({
    row: {
        marginBottom: "20px",
        padding: "0",
        height: "150px",
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
        width: "75px",
        height: "75px",
    },

}));

export default function FullReplyComp(props) {

    function replyComp(index, reply) {
        return (<Grid key={index} item xs container  className={classes.row} spacing={2}>
            <Grid>
                <Avatar
                    className={classes.large}
                    rounded>
                    <span className={classes.label}>{user.name.charAt(0)}</span>
                </Avatar>
            </Grid>
            <Grid item xs container direction="column" spacing={2} zeroMinWidth>
                <Grid item xs >
                 <span className={classes.textStyle}>
                    {reply.tags.join(', ')}
                 </span>
                </Grid>
                <Grid item xs>
                 <span className={classes.subtextStyle}>
                    {reply.description}
                 </span>
                </Grid>
                <Grid item xs>
                 <span className={classes.subtextStyle}>
                    Date: {reply.date}
                 </span>
                 <span className={classes.subtextStyle}>
                    Coordinates: [{reply.xCoordinate}, {reply.yCoordinate}]
                 </span>
                </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={2} >
                <Grid container justify="flex-end">
                 <span className={classes.textStyle}>
                    {reply.userName}
                 </span>
                </Grid>
                <Grid container justify="flex-end">
                 <span className={classes.subtextStyle}>
                    {reply.userAnswer}
                 </span>
                </Grid>
            </Grid>
            <Grid>
                <Avatar
                    className={classes.large}
                    rounded>
                    <span className={classes.label}>{reply.userName.charAt(0)}</span>
                </Avatar>
            </Grid>
            <Grid className={classes.gridWidth}>
                <Button className={classes.largeIcon} >
                    <ShareIcon/>
                </Button>
                <Button className={classes.largeIcon}>
                    <DeleteIcon/>
                </Button>
            </Grid>
        </Grid>)
    }


    const user = useSelector(selectUser)
    const classes = useStyles();
    const [markers, setMarkers] = useState(props.replies);
    const [listItems, setListItems] = useState(markers.map((reply, index) => replyComp(index, reply)));

    return (
        <div>
            {listItems}
        </div>);
}