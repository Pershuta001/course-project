import React from "react";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CreateContainer from "./panels/CreateContainer";
import SearchContainer from "./panels/SearchContainer";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        background: "#3D8A78",
        color :"#ffffff"
    },
    indicator:{
        backgroundColor:'#ffffff'
    },
    back:{
        background:"#3D8A78"
    }
});

export default function CriteriaContainer() {

    const classes = useStyles();
    const tags = ["tag1","tag2","tag3","tag4"];
    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState(<CreateContainer tags={tags}/>);


    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (value === 1)
            setView(<CreateContainer tags={tags}/>);
        else
            setView(<SearchContainer tags={tags}/>);
    };

    return (
        <Grid className={classes.back}>
            <Grid>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    classes={{ indicator: classes.indicator }}
                    centered
                >
                    <Tab label="Create"/>
                    <Tab label="Search"/>
                </Tabs>
            </Paper>
            {view}
            </Grid>
            <Grid>

            </Grid>
        </Grid>
    );
}