import React from 'react';
import MarkerComp from "./MarkerComp";

function HomeMarkers(props) {

    // const markers =  props.data;
    /*[{
    id: 1,
    xCoordinate: 5131.646848,
    yCoordinate: 5131.646846,
    description: "new description osidfjoi osdifosjd oidfjos",
    minRange: 1.5,
    maxRange: 3.5,
    tags: ["Work", "cheel", "100$"]
}]*/
    //  console.log('data from props:' + props.data);
    return (
        <MarkerComp markers={props.data}/>
    )
}

export default HomeMarkers;