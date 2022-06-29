import React, { useState, useEffect } from 'react';
import {Container, Typography, Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

import useStyles from './styles';
import CartItem from "./CartItem/CartItem";

function Cart({cart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart}) {
    const classes = useStyles();
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const isEmpty = !cart.length;

    function computeSubtotal() {
        let tempSubtotal = 0;

        cart.forEach((product) => tempSubtotal += product.quantity*product.price);

        setCartSubtotal(tempSubtotal);
    }

    useEffect(() => {
        computeSubtotal()
    }, [JSON.stringify(cart)]);

    function EmptyCart() {
        return (
            <Typography variant={"subtitle1"}>
                Nu există niciun produs în coșul de cumpărături.
            </Typography>
        )
    }

    function FilledCart() {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.map((product) => (
                        <Grid item xs={12} sm={4} key={product.id}>
                            <CartItem product={product} handleUpdateCartQuantity={handleUpdateCartQuantity} handleRemoveFromCart={handleRemoveFromCart}/>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant={"h4"}>
                        Subtotal: {Math.round((cartSubtotal + Number.EPSILON) * 100) / 100} Lei
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size={"large"} type={"button"} variant={"contained"} color={"secondary"} onClick={handleEmptyCart}>
                            Golește coșul
                        </Button>
                        <Button component={Link} to={"/checkout"} className={classes.checkoutButton} size={"large"} type={"button"} variant={"contained"} color={"primary"}>
                            Finalizează comanda
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant={"h3"} gutterBottom>Coșul de cumpărături</Typography>
            { isEmpty ? <EmptyCart /> : <FilledCart /> }
            <Typography className={"my-3"}/>
        </Container>
    )
}

export default Cart