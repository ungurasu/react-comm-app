import React from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from 'react-hook-form';

import CustomTextField from "./CustomTextField";

function AddressForm() {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <>
            <Typography variant={"h6"} gutterBottom>
                Adresă de livrare
            </Typography>
            <FormProvider>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <CustomTextField control={control} required={true} name={'firstName'} label={'Nume'} />
                        <CustomTextField control={control} required={true} name={'lastName'} label={'Prenume'} />
                        <CustomTextField control={control} required={true} name={'phone'} label={'Telefon'} />
                        <CustomTextField control={control} required={true} name={'email'} label={'E-Mail'} />
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm