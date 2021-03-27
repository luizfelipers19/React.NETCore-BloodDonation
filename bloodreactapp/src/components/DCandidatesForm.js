import { FormControl, Grid, InputLabel, MenuItem, Select, TextField , withStyles } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import useForm from "./useForm";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth:200
        }
    },
    formControl:{
        margin: theme.spacing(1.5),
        minWidth:200
    }
    
})


const initialFieldValues = {
    fullName: '',
    mobile:'',
    email:'',
    age: '',
    bloodGroup: '',
    address: ''
}

const DCandidatesForm = ({classes, ...props}) => {

    const {
        values,
        setValues, 
        handleInputChange
    } = useForm(initialFieldValues)


    return (
        
            <form autoComplete='off' 
            noValidate className={classes.root}
            >
                <Grid container spacing ={1}>
                    <Grid item xs = {12} sm={6}>
                        <TextField
                        name="fullName"
                        variant='outlined'
                        label='Full Name'
                        value = {values.fullName}
                        onChange={handleInputChange}
                        >

                        </TextField>

                        <TextField
                        name="mobile"
                        variant='outlined'
                        label='Telefone'
                        value = {values.mobile}
                        onChange={handleInputChange}
                        >

                        </TextField>

                        <TextField
                        name="email"
                        variant='outlined'
                        label='Email'
                        value = {values.email}
                        onChange={handleInputChange}
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

                        <FormControl variant = 'standard' className={classes.formControl}>
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

                        </FormControl>

                        

                        <TextField
                        name="address"
                        variant='outlined'
                        label='Endereço'
                        value = {values.address}
                        onChange={handleInputChange}
                        >

                        </TextField>
                    </Grid>
                </Grid>
            </form>
        
    )
}

export default withStyles(styles) (DCandidatesForm);
