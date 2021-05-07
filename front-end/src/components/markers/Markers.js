import React, {useState} from 'react';
import Navbar from "../NavbarComp";
import {Grid} from "@material-ui/core";
import CriteriaContainer from "./CriteriaContainer";
import MapComp from "./Map";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Api from "../../api/Api";

let currCoord = {};

export default function Markers() {

    const [currentMarker, setCurrentMarker] = useState([]);
    const [tags, setTags] = useState([]);

    const handleCallback = (coords) => {
        setCurrentMarker(coords);
        currCoord = coords;
    }

    const handleContainerCallback = (responseDatastr) => {

        if (responseDatastr.includes('description'))
            doCreateRequest(responseDatastr);
        else {

            doSearchRequest(responseDatastr);
        }

    }

    function doCreateRequest(data) {
        const dataObj = JSON.parse(data);
        Api.post('/markers/create', {
            tags: dataObj.activeTags,
            min: dataObj.minRange,
            max: dataObj.maxRange,
            description: dataObj.description,
            coords: currCoord
        })
            .then(originalPromiseResult => {
                console.log(originalPromiseResult)

                // showSnack("success", "You successfully signed up !");
            })
            .catch(rejectedValueOrSerializedError => {
                // showSnack("error", "Wrong password or something :/");
                console.log(rejectedValueOrSerializedError)
            })
    }

    function doSearchRequest(data) {
        const dataObj = JSON.parse(data);
        Api.post('/markers/search', {
            tags: dataObj.activeTags,
            min: dataObj.minRange,
            max: dataObj.maxRange,
            coords: currCoord
        })
            .then(originalPromiseResult => {
                console.log(originalPromiseResult)
                // showSnack("success", "You successfully signed up !");
            })
            .catch(rejectedValueOrSerializedError => {
                // showSnack("error", "Wrong password or something :/");
                console.log(rejectedValueOrSerializedError)
            })
    }


    return (
        <div className="home">
            <Navbar/>
            <Grid container>
                <CriteriaContainer responseData={handleContainerCallback} tags={tags}/>
                <MapComp currentCoords={handleCallback} coords={currentMarker}/>
            </Grid>
        </div>)
}

