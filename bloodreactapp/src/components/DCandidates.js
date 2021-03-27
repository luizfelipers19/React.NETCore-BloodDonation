import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {  connect  } from "react-redux";
import * as actions from "../actions/DCandidate"
import DCandidatesForm from "./DCandidatesForm"

const DCandidates = (props) => {
    

    useEffect(()=>{
        props.fetchAllDCandidates()
    },[])


    return (
        <Grid>
            <Grid item xs={6}>
                <DCandidatesForm></DCandidatesForm>
            </Grid>
            <Grid item xs={6}>
                <DCandidatesForm></DCandidatesForm>
                </Grid>
        </Grid>
    );
}

const mapStateToProps = state =>({
        dCandidateList : state.dCandidate.list
    })

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll
  
   
}


export default connect(mapStateToProps, mapActionToProps)(DCandidates);