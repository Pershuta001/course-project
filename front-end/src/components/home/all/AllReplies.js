import React from 'react';
import FullReplyComp from "./FullReplyComp";

function AllReplies() {

    const replies = [{
        id: 1,
        description: "new description ifjosdijf sdjfoisjf sdfjoisdjfos sodifjos jf idfj soidfjodsi osdfosijd soidfjosij sdfoi",
        tags: ["Work", "cheel", "100$"],
        userAnswer: "Ok, bro",
        userName: "Petro Petrovich",
        date: "12.04.2010",
        xCoordinate: 5131.646848,
        yCoordinate: 5131.646846,
        userIcon: []
    },
        {
            id: 2,
            description: "new description ifjosdijf sdjfoisjf sdfjoisdjfos sodifjos jf idfj soidfjodsi osdfosijd soidfjosij sdfoi",
            tags: ["Work", "cheel", "100$"],
            userAnswer: "Ok, bro",
            userName: "Petro Petrovich",
            date: "12.04.2010",
            xCoordinate: 5131.646848,
            yCoordinate: 5131.646846,
            userIcon: []
        }]
    return (
        <FullReplyComp replies={replies}/>
    )
}

export default AllReplies;