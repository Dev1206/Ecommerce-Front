import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}){
    
    const ls = typeof window !== "undefined" ? window.localStorage : null;

    const [cartProducts,setCartProducts] = useState([]);
    
    // useEffect(()=> {
    //     if (ls && ls.getItem('cart')) {
    //         setCartProducts(JSON.parse(ls.getItem('cart')));
    //     }
    // },[]);
    
    useEffect(() =>{
        if(cartProducts?.length >0 ){
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
        else {
            ls?.setItem('cart', JSON.stringify([])); // Ensure cart is cleared in storage if empty
        }
    },[cartProducts,ls]);

    function addProduct(productId){
        setCartProducts(prev => [ ...prev,productId]);
    }
    function removeProduct(productId){
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if(pos !== -1){
                return prev.filter((value,index) => index !== pos);
            }
            return prev;
        });
    }

     function clearCart(){
        setCartProducts([]);
     }

    return(
        <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>{children}</CartContext.Provider>
    );
}