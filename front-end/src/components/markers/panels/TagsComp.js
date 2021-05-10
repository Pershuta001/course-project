import React, {useEffect, useState} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/styles";
import ScrollArea from "react-scrollbar";
import FormGroup from "@material-ui/core/FormGroup";
import Api from "../../../api/Api";

const useStyles = makeStyles(() => ({
    scrollArea: {
        maxHeight: "400px"
    },
    text: {
        fontSize: "15px",
        color: "white"
    },
    checkbox: {
        color: "white",
        '&$checked': {
            color: '#ffffff',
        },
    }
}));

const WhiteCheckbox = withStyles({
    root: {
        color: 'white',
        marginLeft: '20px',
        "&$checked": {
            color: "white"
        }
    },
    checked: {}
})((props) => <Checkbox color="default" {...props} />);


export default function Tags(props) {

    const classes = useStyles();
    const tags = props.tags;
    const checked = initMap();

    function initMap() {
        let temp = new Map();
        for (let tag of tags) {
            temp.set(tag, false);
        }
        return temp;
    }

    const activeTags = () => {
        let res = [];
        checked.forEach((v, k) => {
            if (v) {
                res.push(k)
            }
        })
        return res;
    }

    const tagList = tags.map((tag) => renderTag(tag));


    function renderTag(tag) {
        return (
            <FormControlLabel key={tag}
                              control={
                                  <WhiteCheckbox checked={checked[tag]}
                                                 onChange={() => handleChange(tag)}
                                                 name={tag}
                                                 className={classes.checkbox}/>
                              }
                              className={classes.text}

                              label={tag}
            />);
    }

    const handleChange = (tag) => {
        checked.set(tag, !checked.get(tag))
        console.log(checked);
        const active = activeTags();
        props.activeTags(JSON.stringify(active));
    };

    return (
        <ScrollArea
            speed={0.8}
            className={classes.scrollArea}>
            <FormGroup>
                {tagList}
            </FormGroup>
        </ScrollArea>
    );
}