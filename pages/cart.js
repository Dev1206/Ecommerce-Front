import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Image from 'next/image';

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .8fr;
    }
    gap: 40px;
    margin-top: 40px;
`; 

const Box = styled.div`
    background-color:#fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width:100px;
    height:100px;
    padding: 2px;
    margin-bottom:5px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width:80px;
        max-height:80px;
    }
    @media screen and (min-width: 768px) {
        padding: 10px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen and (min-width: 768px) {
        display: inline-block;
        padding: 0 10px;
    }
`;

const CityHolder = styled.div`
    display:flex;
    gap:5px;
`;

export default function CartPage() {
    
    const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [address , setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);

    
    useEffect(() =>{
        if(cartProducts.length >0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {setProducts(response.data);})
        }
        else{
            setProducts([]);
        }
    },[cartProducts]);
    
    useEffect(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('success')) {
          setIsSuccess(true);
          clearCart();
        }
      }, [clearCart]);

    function moreOfThisProduct(id){
        addProduct(id);
    }
 
    function lessOfThisProduct(id){
        removeProduct(id);
    }


    async function goToPayment(){
        const response = await axios.post('/api/checkout',{
            name,email,address,city,postalCode,country,
            cartProducts,
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }

    let total = 0;
    const productQuantities = cartProducts.reduce((acc, productId) => {
        acc[productId] = (acc[productId] || 0) + 1;
        return acc;
    }, {});

    for (const productId in productQuantities) {
        const product = products.find(p => p._id === productId);
        if (product) {
            total += product.price * productQuantities[productId];
        }
    }

    if (isSuccess){
        return (
            <>
                <Header/>
                <Center>
                    <ColumnsWrapper>
                    <Box>
                        <h1>Thanks for Ordering!</h1>
                        <p>We will email you when your order is shipped.</p>
                    </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        );
    }
    
    return(
        <>
        <Header/>
        <Center>
            <ColumnsWrapper>
                <Box>
                    <h2>Cart Items</h2>
                    
                    {!cartProducts?.length && (
                        <div> Cart Empty</div>
                    )}
                    {products?.length >0  && (
                    <Table>

                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody> 
                            {products.map(product => (
                                <tr key={product._id}>
                                    <ProductInfoCell>
                                        <ProductImageBox>
                                            
                                            <Image src={product.images[0]} alt={product.title} width={80} height={80} />   {/* <img src={product.images[0]} /> */}
                                            
                                        </ProductImageBox>
                                        {product.title}
                                    </ProductInfoCell>
                                    <td>
                                        <Button onClick={() => lessOfThisProduct(product._id)} >-</Button>
                                        <QuantityLabel>{cartProducts.filter(id => id === product._id).length}</QuantityLabel>
                                        <Button onClick={() => moreOfThisProduct(product._id)} >+</Button>
                                    </td>
                                    <td>
                                        ${cartProducts.filter(id => id === product._id).length * product.price}
                                    </td>
                                </tr>        
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>${total}</td>
                            </tr>
                        </tbody>

                    </Table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                    <Box>
                    <h2>Order Information</h2>
                    
                        <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
                        <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
                        <Input type="text" placeholder="Address" value={address} name="address" onChange={ev => setAddress(ev.target.value)}/>
                        <CityHolder>
                            <Input type="text" placeholder="city" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
                            <Input type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)}/>
                        </CityHolder>
                        <Input type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>
                        <Button block black onClick={goToPayment}>Continue to Payment</Button>
                    
                </Box>
                )}
            </ColumnsWrapper>
        </Center>
        </>
    );
}