import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";

import useStyles from './styles';

function Product({product, onAddToCart}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant={"h5"} gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant={"h5"} className={classes.price}>
                        {product.price} Lei
                    </Typography>
                </div>
                <Typography variant={"body2"} color={"textSecondary"}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label={"Cumpără"} onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product