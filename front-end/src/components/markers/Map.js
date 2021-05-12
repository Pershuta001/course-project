import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {TileLayer, Marker, Popup, MapContainer, useMapEvents, useMap} from 'react-leaflet';
import {Button, Grid} from "@material-ui/core";
import {TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Api from "../../api/Api";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({

    mapContainer: {
        width: "1342px",
        height: "850px"
    },
    popup: {
        width: "300px"
    }

});

function getIcon(_iconSize) {
    return L.icon({
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        iconSize: [_iconSize],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
    })
}


export default function MapComp(props) {
    const classes = useStyles();
    const position = [50.483975, 30.532205];
    const [answer, setAnswer] = useState('');

    const MyMarker = (props) => {
        const leafletRef = useRef();
        useEffect(() => {
            leafletRef.current.openPopup();
        }, [])
        return <Marker ref={leafletRef} {...props} />
    }

    function YourComponent() {
        const map = useMap();
        const [bounds, setMyBounds] = React.useState({});

        React.useEffect(() => {
            const eventHandler = event => {
                props.bounds(event.target.getBounds());
            }
            map.on("moveend", eventHandler);

            return () => {
                map.off("moveend", eventHandler); // Remove event handler to avoid creating multiple handlers
            }
        }, []);

        return (
            // Use bounds for whatever you need
            <div>Lat: {bounds.lat}; long: {bounds.lng}</div>
        )
    }

    function MarkerMyPopup(props) {

        function handleReply(uuid) {
            const text = document.getElementById(uuid).value;
            Api.post('/reply', {
                markerId: uuid,
                answer: text
            }).then(originalPromiseResult => {
                document.getElementById(uuid).value = '';
                // showSnack("success", "You successfully signed up !");
            })
                .catch(rejectedValueOrSerializedError => {
                    // showSnack("error", "Wrong password or something :/");
                    console.log(rejectedValueOrSerializedError)
                })
        }

        return (
            <MyMarker position={[parseFloat(props.data.coords.lat), parseFloat(props.data.coords.lng)]}
                      icon={getIcon(50)}>
                <Popup className={classes.popup}>
                    <Grid>
                        <Grid container direction="row">
                            <Grid>
                                <Avatar
                                    className={classes.large}>
                                    <span className={classes.label}>{props.data.userView.userFirstname.charAt(0)}</span>
                                </Avatar>
                            </Grid>
                            <Grid container direction="column">
                                <Grid> <span
                                    className={classes.label}>{props.data.userView.userFirstname + ' ' + props.data.userView.userLastname}</span>
                                </Grid>
                                <Grid> <span
                                    className={classes.label}>{'rating: ' + props.data.userView.rating}</span> </Grid>
                                <Grid>   <span
                                    className={classes.label}>{'karma: ' + props.data.userView.karma}</span> </Grid>
                                <Grid>   <span
                                    className={classes.label}>{'price range: ' + props.data.minPrice + '-' + props.data.maxPrice}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography>
                                {props.data.description}
                            </Typography>
                        </Grid>
                        <Grid
                            className={classes.popup}
                        >
                            <Grid>
                                <TextField
                                    id={props.data.uuid}
                                    multiline
                                    rows={3}

                                />
                            </Grid>
                            <Grid>
                                <Button onClick={() => handleReply(props.data.uuid)}>Reply</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Popup>
            </MyMarker>
        );

    }

    function Markers() {
        return (
            <>
                {props.markers.map(marker =>
                    <MarkerMyPopup key={marker.uuid} data={marker}/>
                )}
            </>
        )
    }

    function MyComponent() {
        useMapEvents({
            click(e) {
                props.currentCoords([e.latlng]);
            },
        })

        return (
            <>
                {props.coords.map(marker =>
                    <Marker key={marker}
                            position={marker}
                            icon={getIcon(50)}>
                    </Marker>
                )}
            </>
        )
    }

    return (
        <MapContainer
            className={classes.mapContainer}
            center={position}
            zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MyComponent/>
            <Markers/>
            <YourComponent/>
        </MapContainer>

    );

}