import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/auth/Auth";
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

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
        width: "50px",
        height: "50px",
    },

}));

export default function RequestComp(props) {

    function replyComp(index, reply) {
        return (
            <Grid key={index} item xs={12} sm container className={classes.row} spacing={3}>
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
                    </Grid>
                </Grid>
                <Grid>
                    <Avatar
                        className={classes.large}>
                        <span className={classes.label}>{reply.userFirstname.charAt(0)}</span>
                    </Avatar>
                </Grid>
                <Grid item xs={5} container direction="column" spacing={2}>
                    <Grid>
                 <span className={classes.textStyle}>
                    {'Replier: ' + reply.userFirstname + ' ' + reply.userLastname}
                 </span>
                    </Grid>
                    <Grid>
                 <span className={classes.textStyle}>
                    {'Karma: ' + reply.replierKarma}
                 </span>
                    </Grid>
                    <Grid>
                 <span className={classes.textStyle}>
                    {'Rating: ' + reply.replierRating}
                 </span>
                    </Grid>
                    <Grid>
                  <span className={classes.textStyle}>
                    {'Answer: ' + reply.answer}
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
    const [listItems] = useState(props.replies.map((reply, index) => replyComp(index, reply)));

    return (
        <div>
            {listItems}
        </div>);
}