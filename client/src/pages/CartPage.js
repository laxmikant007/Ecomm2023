import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            });

        } catch (error) {
            console.log(error)
        }
    }

    const removeCart = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            toast.success("Item removed Success!!");
            localStorage.setItem('cart', JSON.stringify(myCart));


        } catch (error) {
            console.log("Error While removing Item-->", error);
            toast.error("Error in removing item!😢")

        }
    }

    const getToken = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            // console.log("this is token -- >" , data?.clientToken);
            setClientToken(data?.clientToken);


        } catch (error) {
            console.log("Erro in getoken-->", error);
            toast.error("Something went worng in Get-Token");

        }
    }

    useEffect(() => {
        getToken();

    }, [auth?.token]);


    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce, cart
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Done Successfully!!");


        } catch (error) {
            console.log("Error while handle payment-->", error);
            toast.error("Error in Handle-Payment!!");
            setLoading(false);

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
                                <div className="row mb-2 p-3 card flex-row" key={item._id}>
                                    <div className="col-md-4">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                                            className="card-img-top m-2"
                                            alt={item.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                        <p> Price :{item.price}</p>
                                        <Button variant="contained" color="error" onClick={() => removeCart(item._id)}>
                                            Remove
                                        </Button>

                                    </div>

                                </div>

                            ))
                        }


                    </div>
                    <div className="col-md-3 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout| Payment | </p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address </h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <Button variant="contained" onClick={() => navigate("/dashboard/user/profile")}>
                                        Update Address
                                    </Button>
                                </div>


                            </>
                        ) : (<>
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <Button onClick={() => navigate("/dashboard/user/profile")} variant="contained">Update Address</Button>
                                    ) : (<Button onClick={() => navigate("/login", { state: "/cart" })} variant="contained">Please Login to Checkout</Button>)
                                }
                            </div>



                        </>)}
                        <div className="mt-2">

                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={instance => setInstance(instance)}
                                        />
                                        <Button 
                                        disabled={loading || !instance || !auth?.user?.address}
                                        onClick={handlePayment} 
                                        variant="contained">
                                        {loading ? "Processing..." : "Make Payment"}</Button>
                                    </>
                                )
                            }



                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage