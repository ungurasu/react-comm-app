import React, {useState} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";

import useStyles from './styles';
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {collection, getDocs, query, setDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase";

const steps=['Livrare', 'Detalii plată'];

function Checkout({cart, cartTotal, emptyCart}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});

    function Confirmation() {
        return (
            <div>
                Confirmation
            </div>
        )
    }

    function Form() {
        return (activeStep === 0 ? <AddressForm next={Next}/> : <PaymentForm cart={cart} cartTotal={cartTotal} decrementStep={decrementStep} placeOrder={PlaceOrder}/>);
    }

    function incrementStep() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function decrementStep() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    function Next(data) {
        console.log(data);
        setShippingData(data);
        console.log(shippingData);

        incrementStep();
    }

    async function PlaceOrder(data) {
        const ordersQuery = query(collection(db, "order"));
        let ordersList = await getDocs(ordersQuery);
        ordersList = ordersList.docs.map(order => order.data());
        ordersList.sort(function(a,b){return b.id-a.id});

        let orderID = ordersList[0].id + 1;

        let order = {...shippingData, ...data};
        order.id = orderID;
        order.paymentTotal = cartTotal;
        console.log(order);

        await setDoc(doc(db, "order", "" + orderID), order);

        emptyCart();
    }

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant={"h4"} align={"center"}>
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;