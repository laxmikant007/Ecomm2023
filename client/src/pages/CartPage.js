import React, { useState } from 'react'
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const removeCart = (pid)=>{
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item)=> item._id===pid);
            myCart.splice(index , 1);
            setCart(myCart);
            toast.success("Item removed Success!!")

            
        } catch (error) {
            console.log("Error While removing Item-->", error );
            toast.error("Error in removing item!😢")
            
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {
                                cart?.length > 1 ?
                                    `You have ${cart.length} items in your cart  ${auth?.token ? " " : "Please Login to Checkout"}` : "Your Cart is Empty!"
                            }
                        </h4>

                    </div>

                </div>
                <div className="row">
                    <div className="col-md-9">
                        {
                            cart?.map((item) => (
                                <div className="row mb-2 p-3 card flex-row">
                                    <div className="col-md-4">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                                            className="card-img-top m-2"
                                            alt={item.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                        <p> Price :{item.name}</p>
                                        <Button variant="contained" color="error" onClick={()=> removeCart(item._id)}>
                                            Remove
                                        </Button>

                                    </div>

                                </div>

                            ))
                        }


                    </div>
                    <div className="col-md-3">
                        Payment | Checkout
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage