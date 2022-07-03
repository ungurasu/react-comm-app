import React from 'react';
import {Typography, List, ListItem, ListItemText} from "@material-ui/core";

function Review({cart, cartTotal}) {
    return (
        <>
            <Typography variant={"h6"} gutterBottom>Sumar comandă</Typography>
            <List disablePadding>
                {cart.map((product) => (
                    <ListItem style={{padding: '10px 0'}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Cantitate: ${product.quantity}`}/>
                        <Typography variant={"body2"}>
                            {Math.round((product.price * product.quantity + Number.EPSILON) * 100) / 100} Lei
                        </Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: "10px 0"}}>
                    <ListItemText primary={"Total"}/>
                    <Typography variant={"subtitle1"} style={{fontWeight: 700}}>
                        {Math.round((cartTotal + Number.EPSILON) * 100) / 100} Lei
                    </Typography>
                </ListItem>
            </List>
        </>
    );
}

export default Review