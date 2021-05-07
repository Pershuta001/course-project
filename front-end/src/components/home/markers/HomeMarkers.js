import React from 'react';
import MarkerComp from "./MarkerComp";

function HomeMarkers() {

    const markers = [{
        id: 1,
        xCoordinate: 5131.646848,
        yCoordinate: 5131.646846,
        description: "new description ifjosdijf sdjfoisjf sdfjoisdjfos sodifjos jf idfj soidfjodsi osdfosijd soidfjosij sdfoi osidfjs sdfosijf osidfjoi osdifosjd oidfjos",
        minRange: 1.5,
        maxRange: 3.5,
        tags: ["Work", "cheel", "100$"]
    }]
    return (

        <MarkerComp markers={markers}/>
    )
}

export default HomeMarkers;