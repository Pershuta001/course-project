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
        margin: "0",
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

export default function MarkerComp(props) {

    function markerComp(index, marker) {
        console.log(marker)
        return (
            <Grid key={index} item xs={12} sm container className={classes.row} spacing={3}>
                <Grid>
                    <Avatar
                        className={classes.large}>
                        <span className={classes.label}>{marker.userView.userFirstname.charAt(0)}</span>
                    </Avatar>
                </Grid>
                <Grid item xs={5} container direction="column" spacing={2} zeroMinWidth>
                    <Grid container direction="column" spacing={1}>
                        <Grid>
                            <span
                                className={classes.textStyle}>{'Host: ' + marker.userView.userFirstname + ' ' + marker.userView.userLastname}</span>

                        </Grid>
                        <Grid>
                            <span
                                className={classes.textStyle}>{' Rating: ' + marker.userView.rating}</span>

                        </Grid>
                        <Grid>
                            <span
                                className={classes.textStyle}>{' Karma: ' + marker.userView.karma}</span>
                        </Grid>
                        <Grid>
                            <span className={classes.textStyle}>
                                 {'Tags: ' + marker.tags.join(', ')}
                             </span>
                        </Grid>
                        <Grid>
                             <span className={classes.textStyle}>
                                {'Description: ' + marker.description}
                             </span>
                        </Grid>
                        <Grid>
                             <span className={classes.textStyle}>
                                {'Price range: ' + marker.minPrice + '-' + marker.maxPrice}
                             </span>
                        </Grid>
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
    const [listItems] = useState(props.markers.map((marker, index) => markerComp(index, marker)));

    return (
        <div>
            {listItems}
        </div>);
}