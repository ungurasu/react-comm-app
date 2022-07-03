import React from 'react';
import {Typography, Button, Divider, Grid} from "@material-ui/core";
import {useForm, FormProvider, useFormContext} from 'react-hook-form';

import Review from './Review';
import CustomTextField from "./CustomTextField";
import {Link} from "react-router-dom";

function PaymentForm({cart, cartTotal, decrementStep, placeOrder}) {

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <>
            <Review cart={cart} cartTotal={cartTotal}/>
            <Divider />
            <Typography variant={"h6"} gutterBottom style={{margin: '20px 0'}}>
                Metodă de plată
            </Typography>
            <FormProvider>
                <form onSubmit={handleSubmit((data) => placeOrder({...data}))}>
                    <Grid container spacing={3}>
                        <CustomTextField control={control} name={'cardName'} label={'Nume complet'} />
                        <CustomTextField control={control} name={'cardNumber'} label={'Număr card'} />
                        <CustomTextField control={control} name={'cardExpirationDate'} label={'Dată expirare'} />
                        <CustomTextField control={control} name={'cardCVV'} label={'CVV'} />
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={decrementStep} variant={"outlined"}>
                            Înapoi la livrare
                        </Button>
                        <Button component={Link} to={"/"} type={"submit"} variant={"contained"} color={"primary"}>
                            Plătește
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default PaymentForm