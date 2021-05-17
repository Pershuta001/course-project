import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CreateContainer from "./panels/CreateContainer";
import SearchContainer from "./panels/SearchContainer";
import Api from "../../api/Api";
import TextField from "@material-ui/core/TextField";
import {validateLastname} from "../utils/Validation";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        background: "#3D8A78",
        color: "#ffffff"
    },
    indicator: {
        backgroundColor: '#ffffff'
    },
    back: {
        background: "#3D8A78"
    }
});

export default function CriteriaContainer(props) {
    const handleContainer = (responseData) => {
        props.responseData(responseData);

    };

    const [tags, setTags] = useState([]);
    useEffect(() => {
        const id = setInterval(() =>
                Api.get('/tags/all')
                    .then(response => {
                        setTags(response.data);
                    })
                    .catch(rejectedValueOrSerializedError => {
                        // showSnack("error", "Wrong password or something :/");
                        console.log(rejectedValueOrSerializedError)
                    })
            , 5000
        );

        return () => clearInterval(id);
    }, []);

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [view, setView] = React.useState(<CreateContainer tags={tags} responseData={handleContainer}/>);


    const handleChange = (event, newValue) => {

        setValue(newValue);
        if (value === 1)
            setView(<CreateContainer tags={tags} responseData={handleContainer}/>);
        else
            setView(<SearchContainer tags={tags} responseData={handleContainer}/>);
    };



    return (
        <Grid className={classes.back}>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    classes={{indicator: classes.indicator}}
                    centered
                >
                    <Tab label="Create"/>
                    <Tab label="Search"/>
                </Tabs>
            </Paper>
            {view}
        </Grid>
    );
}