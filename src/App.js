import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {getDocs, collection, query, setDoc, doc } from "firebase/firestore"
import {db} from './firebase'

import { Products, Navbar, Cart, CheckOut } from './components'

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    function calculateCartTotal() {
        let tempTotal = 0;

        cart.forEach((product) => tempTotal += product.quantity);

        setCartTotal(tempTotal);
    }

    async function fetchProducts() {
        const productsQuery = query(collection(db, "products"));

        let productsList = await getDocs(productsQuery);

        productsList = productsList.docs.map(product => product.data());

        setProducts(productsList);
    }

    function handleUpdateCartQuantity(productId, quantity) {
        let tempCart = cart;
        let addedProduct = tempCart.find(product => product.id == productId);
        let product = products.find(single_product => single_product.id == productId);
        let productClone = {};

        if (addedProduct) {
            addedProduct.quantity += quantity;
            if (addedProduct.quantity <= 0) {
                handleRemoveFromCart(productId);
            }
        }
        else {
            for (let key in product) {
                productClone[key] = product[key];
            }
            productClone.quantity = quantity;
            tempCart.push(productClone);
        }

        setCart(tempCart);
        calculateCartTotal();
    }

    function handleRemoveFromCart(productId) {
        let tempCart = cart;
        let removedProduct = tempCart.find(product => product.id == productId);

        if (removedProduct !== undefined) {
            tempCart.splice(removedProduct, 1);
        }

        setCart(tempCart);
        calculateCartTotal();
    }

    function handleEmptyCart() {
        setCartTotal(0);
        setCart([]);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cartTotal}/>
                <Routes>
                    <Route exact path={"/"} element={<Products products={products} onAddToCart={handleUpdateCartQuantity}/>} />
                    <Route exact path={"/cart"} element={<Cart cart={cart} handleUpdateCartQuantity={handleUpdateCartQuantity} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>} />
                    <Route exact path={"/checkout"} element={<CheckOut cart={cart} cartTotal={cartTotal} emptyCart={handleEmptyCart}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
