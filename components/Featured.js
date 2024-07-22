import Center from "@/components/Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Image from 'next/image';

const Bg = styled.div`
    background-color: #222;  
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin:0;
    font-weight: normal;
    font-size: 1.8rem; 
    @media screen and (min-width: 768px) {
        font-size: 3rem; 
    }
`;

const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1) {
    order: 2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr .9fr;
        
        div:nth-child(1) {
            order: 0;
        }
        img{
            max-width: 100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top:25px;

`;

const ImageWrapper = styled.div`
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
    @media screen and (min-width: 768px) {
        max-width: 100%;
    }
`;

export default function Featured({product}){
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart(){
        addProduct(product._id);
    }
    return(
        <Bg>
            <Center>
            <ColumnsWrapper>
                <Column>
                <div>
                    <Title>{product.title}</Title>
                    <Desc>{product.description}</Desc>
                    <ButtonsWrapper>
                        <ButtonLink href={'/products/'+product._id} outline={1} white={1} >Read More</ButtonLink>
                        <Button white={1} onClick={addFeaturedToCart} ><CartIcon/>Add to Cart</Button>
                    </ButtonsWrapper>
                </div>
                </Column>
                <Column>
                    <ImageWrapper>
                        <Image src="https://devkakadia-ecommerce.s3.amazonaws.com/1721222940262.png" alt={product.title} layout="responsive" width={500} height={500} />
                        {/* <img src="https://devkakadia-ecommerce.s3.amazonaws.com/1721222940262.png"></img> */}
                    </ImageWrapper>
                </Column>
            </ColumnsWrapper>
            </Center>
        </Bg>
    );
}