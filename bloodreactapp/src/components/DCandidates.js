import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {  connect  } from "react-redux";
import * as actions from "../actions/DCandidate"
import DCandidatesForm from "./DCandidatesForm"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useToasts} from "react-toast-notifications";


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
    
    const [currentId, setCurrentId] = useState(0)

    useEffect(()=>{
        props.fetchAllDCandidates()
    },[])
    const {addToast} = useToasts()

    const onDelete = id =>{
        if(window.confirm("Are you Sure to delete this shit?"))
        props.deleteDCandidate(id, ()=> addToast("Deletado na manha", {appearance: 'info'}) )
    }

    return (
        <Paper className={classes.paper} elevation={10}>

            <Grid container>
            <Grid item xs={6}>
                <DCandidatesForm {... ({currentId, setCurrentId})} ></DCandidatesForm>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Nome do Candidato</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Grupo Sanguíneo</TableCell>
                                <TableCell></TableCell>
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
                                            {record.phoneNumber}
                                        </TableCell>
                                        <TableCell>
                                            {record.bloodGroup}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button> <EditIcon color="primary" onClick={()=> {setCurrentId(record.id)} }></EditIcon> </Button>
                                                <Button> <DeleteIcon color="secondary"
                                                onClick={()=> onDelete(record.id)  }
                                                ></DeleteIcon> </Button>
                                                
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>)
                               })
                           }
                        </TableBody>
                    </Table>
                </TableContainer>
                
                </Grid>
        </Grid>
        </Paper>
        
    );
}

const mapStateToProps = state =>({
        dCandidateList : state.dCandidate.list
    })

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
  deleteDCandidate: actions.Delete
  
   
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (DCandidates));