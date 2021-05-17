import React from "react";
import HomeMarkers from "./markers/HomeMarkers";
import ActiveReplies from "./replies/ActiveReplies";
import AllReplies from "./all/AllReplies";
import Shared from "./shared/Shared";
import ActiveRequests from "./requests/ActiveRequests";

export default function ActivePanel(props) {


    function ChooseElem() {
        let elem;
        const data = props.data == null ? [] : props.data;
        switch (props.view) {
            case "markers":
                elem = <HomeMarkers data={data}/>;
                break;
            case "active":
                elem = <ActiveReplies data={data}/>;
                break;
            case "active requests":
                elem = <ActiveRequests data={data}/>;
                break;
            case "all":
                elem = <AllReplies data={data}/>;
                break;
            case "shared":
                elem = <Shared data={data}/>;
                break;
            default:
                elem = <HomeMarkers data={data}/>;
                break;
        }

        return elem;

    }

    return <ChooseElem/>;

};