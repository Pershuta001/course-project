import React from 'react';
import RequestComp from "./RequestComp";

function ActiveRequests(props) {

   // const replies =  ;
        /*[{
        id: 1,
        description: "new description ifjosdijf sdjfoisjf sdfjoisdjfos sodifjos jf idfj soidfjodsi osdfosijd soidfjosij sdfoi",
        tags: ["Work", "cheel", "100$"],
        userAnswer: "Ok, bro",
        userName: "Petro Petrovich",
        userIcon: []
    },
        {
            id: 2,
            description: "new description ifjosdijf sdjfoisjf sdfjoisdjfos sodifjos jf idfj soidfjodsi osdfosijd soidfjosij sdfoi",
            tags: ["Work", "cheel", "100$"],
            userAnswer: "Ok, bro",
            userName: "Petro Petrovich",
            userIcon: []
        }]*/
    return (
        <RequestComp replies={props.data}/>
    )
}

export default ActiveRequests;