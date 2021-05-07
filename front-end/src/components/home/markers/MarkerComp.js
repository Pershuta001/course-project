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

const useStyles = makeStyles(() => ({
    row: {
        margin: "0",
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
        width: "50px",
        height: "50px",
    },

}));

export default function MarkerComp(props) {

    function markerComp (index, marker) {
      return( <Grid key={index} item xs={12} sm container  className={classes.row}>
            <Grid>
                <Avatar
                    className={classes.large}
                    rounded>
                    <span className={classes.label}>{user.name.charAt(0)}</span>
                </Avatar>
            </Grid>
            <Grid item xs={7} container direction="column" spacing={2} zeroMinWidth>
                <Grid item xs >
                 <span className={classes.textStyle}>
                    {marker.tags.join(', ')}
                 </span>
                </Grid>
                <Grid item xs>
                 <span className={classes.subtextStyle}>
                    {marker.description}
                 </span>
                </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs sm>
                    <span className={classes.subtextStyle}>
                   min
                    </span>
                    <span className={classes.subtextStyle}>
                    {marker.minRange}
                    </span>
                    <span className={classes.subtextStyle}>
                   {marker.maxRange}
                    </span>
                    <span className={classes.subtextStyle}>
                     max
                    </span>
                </Grid>
                <Grid item xs sm>
                      <span className={classes.subtextStyle}>
                          {marker.xCoordinate}
                    </span>
                    <span className={classes.subtextStyle}>
                          {marker.yCoordinate}
                    </span>
                </Grid>
            </Grid>
            <Grid container justify = "center"
                  className={classes.gridWidth}>
                <Button>
                    <DeleteIcon className={classes.largeIcon} color={"action"}/>
                </Button>
            </Grid>
        </Grid>)
    }


    const user = useSelector(selectUser)
    const classes = useStyles();
    const [markers, setMarkers] = useState(props.markers);
    const [listItems, setListItems] = useState(markers.map((marker, index) => markerComp(index, marker)));

    return (
        <div>
            {listItems}
        </div>);
}