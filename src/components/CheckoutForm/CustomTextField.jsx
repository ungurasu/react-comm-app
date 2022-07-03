import React from 'react';
import { TextField, Grid, CheckBox } from '@material-ui/core';
import {useFormContext, Controller, useForm} from "react-hook-form";

function CustomTextField({name, label}) {
    const { control } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                render={({ field: {onChange, onBlur, value} }) => (
                    <TextField
                        name={name}
                        label={label}
                        placeholder={label}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        required
                        style={{width: '100%'}}
                    />
                )}
            />
        </Grid>
    );
}

export default CustomTextField