import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {  connect  } from "react-redux";
import * as actions from "../actions/DCandidate"
import DCandidatesForm from "./DCandidatesForm"


const styles = theme => ({
    root:{
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper : {
        margin: theme.spacing(2),
        padding: theme. spacing(2)
    }
})
//props.classes
//const [classes, ...props] = props

const DCandidates = ({classes, ...props}) => {
    

    useEffect(()=>{
        props.fetchAllDCandidates()
    },[])


    return (
        <Paper className={classes.paper} elevation={10}>

            <Grid container>
            <Grid item xs={6}>
                <DCandidatesForm></DCandidatesForm>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Nome do Candidato</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Grupo Sanguíneo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {
                               props.dCandidateList.map((record, index) => {
                                    return (<TableRow key = {index} hover>
                                        <TableCell>
                                            {record.fullName}
                                        </TableCell>
                                        <TableCell>
                                            {record.mobile}
                                        </TableCell>
                                        <TableCell>
                                            {record.bloodGroup}
                                        </TableCell>
                                    </TableRow>)
                               })
                           }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    list of candidates
                </div>
                </Grid>
        </Grid>
        </Paper>
        
    );
}

const mapStateToProps = state =>({
        dCandidateList : state.dCandidate.list
    })

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll
  
   
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (DCandidates));