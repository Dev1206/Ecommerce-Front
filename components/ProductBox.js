import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
    background-color:#fff;
    padding:20px;
    height:120px;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 10px;
    img{
        max-width:100%;
        max-height:80px;
    }
`;

const Title = styled(Link)`
    font-weight:normal;
    font-size:.9rem;
    margin:0;
    text-decoration:none;
    color:inherit;
`;

const ProductInfoBox = styled.div`
    margin-top:5px;
`;

const PriceRow = styled.div`
    display:flex; 
    align-items:center;
    justify-content:space-between;
    margin-top:5px;
`;

const Price = styled.div`
    font-size:1.3rem;
    font-weight:500;
`;

export default function ProductBox({_id,title,description,price,images}){
    
    const {addProduct} = useContext(CartContext);
    const url = '/products/'+_id;
    return(
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]}/>
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title  href={url}>{title}</Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button primary outline onClick={() => addProduct(_id)}><CartIcon/></Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}