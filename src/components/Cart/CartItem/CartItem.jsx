import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from "@material-ui/core";

import useStyles from './styles';

function CartItem({product, handleUpdateCartQuantity, handleRemoveFromCart}) {
    const classes = useStyles();

    return (
       <Card>
           <CardMedia image={product.image} alt={product.name} className={classes.media}/>
           <CardContent className={classes.cardContent}>
               <Typography className={classes.productName}>
                   {product.name}
               </Typography>
               <Typography className={classes.productPrice}>
                   {Math.round((product.price * product.quantity + Number.EPSILON) * 100) / 100} Lei
               </Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>
               <div className={classes.buttons}>
                   <Button type={"button"} size={"small"} onClick={() => handleUpdateCartQuantity(product.id, -1)}>
                       -
                   </Button>
                   <Typography>
                       {product.quantity}
                   </Typography>
                   <Button type={"button"} size={"small"} onClick={() => handleUpdateCartQuantity(product.id, 1)}>
                       +
                   </Button>
               </div>
               <Button variant={"contained"} type={"button"} color={"secondary"} onClick={() => handleRemoveFromCart(product.id)}>
                   Șterge
               </Button>
           </CardActions>
       </Card>
    );
}

export default CartItem;