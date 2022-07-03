import React from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from 'react-hook-form';
import {Link} from "react-router-dom";

import CustomTextField from "./CustomTextField";

function AddressForm({next}) {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <>
            <Typography variant={"h6"} gutterBottom>
                Adresă de livrare
            </Typography>
            <FormProvider>
                <form onSubmit={handleSubmit((data) => next({...data}))}>
                    <Grid container spacing={3}>
                        <CustomTextField control={control} name={'firstName'} label={'Prenume'} />
                        <CustomTextField control={control} name={'lastName'} label={'Nume'} />
                        <CustomTextField control={control} name={'email'} label={'E-Mail'} />
                        <CustomTextField control={control} name={'address'} label={'Adresă'} />
                        <CustomTextField control={control} name={'city'} label={'Oraș'} />
                        <CustomTextField control={control} name={'county'} label={'Județ'} />
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to={"/cart"} variant={"outlined"}>
                            Înapoi la coș
                        </Button>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            Înainte
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm