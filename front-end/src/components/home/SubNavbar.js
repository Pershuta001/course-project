import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/styles";
import ActivePanel from "./ActivePanel";

const useStyles = makeStyles(() => ({
    toolbar: {
        height: "30px"
    },
    background: {
        backgroundColor: "#3D8A78",
        height: "50px"
    },
}));

const SubNavbar = () => {

    const classes = useStyles();

    const [activeView, setActiveView] = useState("markers");


    function changeView(view) {
        setActiveView(view)
    }

    return (
        <AppBar position="static" className={classes.background}>
            <Toolbar className={classes.toolbar}>
                <Button color={"inherit"}
                        onClick={() => changeView("markers")}>
                    <span>Active markers</span>
                </Button>

                <Button color={"inherit"}
                        onClick={() => changeView("active")}>
                    <span>Active replies</span>
                </Button>

                <Button color={"inherit"}
                        onClick={() => changeView("all")}>
                    <span>All replies</span>
                </Button>
                <Button color={"inherit"}
                        onClick={() => changeView("shared")}>
                    <span>Shared</span>
                </Button>
            </Toolbar>
            <ActivePanel view={activeView}/>
        </AppBar>

    )
}

export default SubNavbar