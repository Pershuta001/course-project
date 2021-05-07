import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {TileLayer, Marker, Popup, MapContainer, useMapEvents} from 'react-leaflet';
import {LatLng} from "leaflet/dist/leaflet-src.esm";

const useStyles = makeStyles({

    mapContainer: {
        width: "1342px",
        height: "850px"
    }
});

function getIcon(_iconSize) {
    return L.icon({
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        iconSize: [_iconSize],
        iconAnchor: [25, 50],
    })
}

export default function MapComp(props) {
    const classes = useStyles();
    const position = [50.483975, 30.532205];

    // const markerPos = [props.coords[LatLng].lat,props.coords[LatLng].lng];
    // console.log("coords"+markerPos);
    function MyComponent() {
        useMapEvents({
            click(e) {
                props.currentCoords([e.latlng]);
            },
        })

        return (
            <>
                {props.coords.map(marker =>
                    <Marker key={marker} position={marker} icon={getIcon(50)}>
                        <Popup>Marker is at {marker}</Popup>
                    </Marker>
                )}
            </>
        )
    }


    return (
        <MapContainer
            className={classes.mapContainer}
            center={position}
            zoom={13}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MyComponent/>
        </MapContainer>

    );

}