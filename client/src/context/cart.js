import { useState, useContext, createContext , useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        let cartItems = localStorage.getItem('cart');
        if(cartItems) setCart(JSON.parse(cartItems))
    },[]);


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export {useCart , CartProvider  }