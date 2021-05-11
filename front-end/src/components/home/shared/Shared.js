import React from 'react';
import SharedComp from "./SharedComp";

function Shared(props) {

   // const contacts = props.data == null? []: ;
   /*     [{
        id:1,
        username: "Ivan Petrovich",
        userLogo: "",
        socials:["instagram", "telegram","faceboook"]
    }];*/
    return (
        <div className="home">
            <SharedComp contacts = {props.data} />
        </div>)
}

export default Shared;