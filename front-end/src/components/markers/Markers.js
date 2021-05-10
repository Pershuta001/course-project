import React, {useState} from 'react';
import Navbar from "../NavbarComp";
import {Grid} from "@material-ui/core";
import CriteriaContainer from "./CriteriaContainer";
import MapComp from "./Map";
import Api from "../../api/Api";

let currCoord = {};

export default function Markers() {

    const [currentMarker, setCurrentMarker] = useState([]);
    const [tags] = useState([]);

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
        const params = {
            tags: dataObj.activeTags.replaceAll('"', '').replaceAll('[', '').replaceAll(']', ''),
            lat: currCoord[0].lat.toString(),
            lng: currCoord[0].lng.toString(),
            minRange: dataObj.minRange,
            maxRange: dataObj.maxRange
        }
        console.log(params);
         Api.get('/markers/search', {
             params: params
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

