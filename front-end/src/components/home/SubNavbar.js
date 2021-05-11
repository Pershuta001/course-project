import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/styles";
import ActivePanel from "./ActivePanel";
import Api from "../../api/Api";

const useStyles = makeStyles(() => ({
    toolbar: {
        height: "30px"
    },
    background: {
        backgroundColor: "#3D8A78",
        height: "50px"
    },
}));

function SubNavbar() {

    const classes = useStyles();

    const [activeView, setActiveView] = useState("markers");
    const [data, setData] = useState([]);

    function changeView(view) {
        setActiveView(view);
        getData(view);
    }

    function getData(view) {
        setData([]);
        switch (view) {
            case "markers":
                getDataFromServer('/markers/my');
                break;
            case "shared":
                getDataFromServer('/replies/data')
                break;
            case "active":
                getDataFromServer('/my/replies/active');
                break;
            case "all":
                getDataFromServer('/my/replies/all');
                break;
        }
    }

    function getDataFromServer(path) {
        Api.get(path)
            .then(originalPromiseResult => {
                setData(originalPromiseResult.data);
            })
            .catch(rejectedValueOrSerializedError => {
                // showSnack("error", "Wrong password or something :/");
                console.log(rejectedValueOrSerializedError)
            })

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
            <ActivePanel view={activeView} data={data}/>
        </AppBar>

    )
}

export default SubNavbar