import React from 'react';
import ReplyComp from "./ReplyComp";

function ActiveReplies(props) {

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
        <ReplyComp replies={props.data}/>
    )
}

export default ActiveReplies;