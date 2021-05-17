import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Button,} from "@material-ui/core";

export default function RadioButtonsGroup(props) {
    const [value, setValue] = React.useState("");
    const [value2, setValue2] = React.useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };

    function sendFeedback() {
        props.rating(value);
        props.karma(value2);
    }

    return (
        <div>
            <label>
                Rating
            </label>
            <RadioGroup value={value} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio/>} label="Very Poor"/>
                <FormControlLabel value="2" control={<Radio/>} label="Fair"/>
                <FormControlLabel value="3" control={<Radio/>} label="Good"/>
                <FormControlLabel value="4" control={<Radio/>} label="Excellent"/>
                <FormControlLabel value="5" control={<Radio/>} label="Outstanding"/>
            </RadioGroup>
            <label>Karma points:</label>
            <RadioGroup value={value2} onChange={handleChange2}>
                <FormControlLabel value="1" control={<Radio/>} label="Positive"/>
                <FormControlLabel value="0" control={<Radio/>} label="Neutral"/>
                <FormControlLabel value="-2" control={<Radio/>} label="Negative"/>
            </RadioGroup>
            <Button onClick={sendFeedback}>
                Send feedback
            </Button>
        </div>

    );
}