import React from 'react';
import SharedComp from "./SharedComp";

function Shared() {

    const contacts = [{
        id:1,
        username: "Ivan Petrovich",
        userLogo: "",
        socials:["instagram", "telegram","faceboook"]
    }];
    return (
        <div className="home">
            <SharedComp contacts = {contacts}/>
        </div>)
}

export default Shared;