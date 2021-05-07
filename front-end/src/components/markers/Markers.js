import React from 'react';
import Navbar from "../NavbarComp";
import {Grid} from "@material-ui/core";
import CriteriaContainer from "./CriteriaContainer";

function Markers() {

    return (
        <div className="home">
            <Navbar/>
            <Grid>
                <Grid item xs={3} container
                      direction="row"
                      alignItems="stretch">
                    <CriteriaContainer/>
                </Grid>
                <Grid item xs={9}>

                </Grid>
            </Grid>
        </div>)
}

export default Markers;