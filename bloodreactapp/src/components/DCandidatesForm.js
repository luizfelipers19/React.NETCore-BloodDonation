import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField , withStyles } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import useForm from "./useForm";
import {  connect  } from "react-redux";
import * as actions from "../actions/DCandidate"
import {useToasts} from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth:100
        }
    },
    formControl:{
        margin: theme.spacing(1.5),
        minWidth:150
    },
    smMargin:{
        margin: theme.spacing(1)
    }
    
})


const initialFieldValues = {
    fullName: '',
    phoneNumber:'',
    email:'',
    age: '',
    bloodGroup: '',
    address: ''
}



const DCandidatesForm = ({classes, ...props}) => {
//toasts messages

const {addToast} = useToasts()

    //validate()
    //valildate({})
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName?"" : "This field is required."
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber?"" : "This field is required."
        if('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup?"" : "This field is required."
        if('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email)?"": "Email not valid"
        setErrors({
            ...temp
        })
        if(fieldValues == values)
            return Object.values(temp).every(x=> x=="")
    }

    const {
        values,
        setValues, 
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {resetForm()
             addToast("Operação realizada", {appearance:'success'})
        }
           // window.alert("validation succeeded")
           if(props.currentId == 0)
                props.createDCandidate(values, onSuccess)
            else
                props.updateDCandidate(props.currentId, values, onSuccess)
        }

        
        
    }

    useEffect(() => {
        if(props.currentId!= 0){
        setValues({
            ...props.dCandidateList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }
    },[props.currentId])

    return (
        
            <form autoComplete='off' 
            noValidate className={classes.root}
            onSubmit={handleSubmit}
            >
                <Grid container spacing ={1}>
                    <Grid item xs = {12} sm={6}>
                        <TextField
                        name="fullName"
                        variant='outlined'
                        label='Full Name'
                        value = {values.fullName}
                        onChange={handleInputChange}
                        
                        {...(errors.fullName && {error:true, helperText:errors.fullName})}
                        >

                        </TextField>

                        <TextField
                        name="phoneNumber"
                        variant='outlined'
                        label='Telefone'
                        value = {values.phoneNumber}
                        onChange={handleInputChange}
                        {...(errors.phoneNumber && {error:true, helperText:errors.phoneNumber})}
                        >

                        </TextField>

                        <TextField
                        name="email"
                        variant='outlined'
                        label='Email'
                        value = {values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error:true, helperText:errors.email})}
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs = {12} sm={6}>
                    <TextField
                        name="age"
                        variant='outlined'
                        label='Idade'
                        value = {values.age}
                        onChange={handleInputChange}
                        >

                        </TextField>

                        <FormControl variant = 'standard' className={classes.formControl}
                        {...(errors.bloodGroup && {error:true})}
                        >
                            <InputLabel>Grupo Sanguíneo</InputLabel>
                            <Select name='bloodGroup'
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            >
                                <MenuItem value="">Select Blood Group</MenuItem>
                                <MenuItem value='A+'>A+</MenuItem>
                                <MenuItem value='A-'>A-</MenuItem>
                                <MenuItem value='B+'>B+</MenuItem>
                                <MenuItem value='B-'>B-</MenuItem>
                                <MenuItem value='AB+'>AB+</MenuItem>
                                <MenuItem value='AB-'>AB-</MenuItem>
                                <MenuItem value='O+'>O+</MenuItem>
                                <MenuItem value='O-'>O-</MenuItem>
                            </Select>
                            {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                        </FormControl>

                        

                        <TextField
                        name="address"
                        variant='outlined'
                        label='Endereço'
                        value = {values.address}
                        onChange={handleInputChange}
                        >

                        </TextField>
                        <div>
                            <Button
                            variant = 'contained'
                            color="primary"
                            type='submit'
                            className={classes.smMargin}
                            >Submit</Button>

                            <Button
                            variant = 'contained'
                            className={classes.smMargin}
                            onClick={resetForm}
                            >Reset</Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        
    );
}

const mapStateToProps = state =>({
    dCandidateList : state.dCandidate.list
})

const mapActionToProps = {

    createDCandidate : actions.create,
    updateDCandidate : actions.update


}


export default connect( mapStateToProps, mapActionToProps) (withStyles(styles) (DCandidatesForm));
