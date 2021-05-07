import React from "react";
import HomeMarkers from "./markers/HomeMarkers";
import ActiveReplies from "./replies/ActiveReplies";
import AllReplies from "./all/AllReplies";
import Shared from "./shared/Shared";

class ActivePanel extends React.Component {

    render() {
        let elem;
        switch (this.props.view){
            case "markers":
                elem = <HomeMarkers/>;
                break;
            case "active":
                elem = <ActiveReplies/>;
                break;
            case "all":
                elem = <AllReplies/>;
                break;
            case "shared":
                elem = <Shared/>;
                break;
            default:
                elem = <HomeMarkers/>;
        }
        return elem;
    }
}
export default ActivePanel;