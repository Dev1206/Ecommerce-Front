import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
    max-width:100%;
    max-height:100%;  
`;
const BigImage = styled.img`
    max-width:100%;
    max-height:200px;  
`;
const ImageButtons = styled.div`
    display:flex;
    gap:10px;
    flex-grow:0;
    margin-top:10px;
`;

const ImageButton = styled.div`
    border:1px solid #aaa;
    ${props => props.active ? `
        border-color: #ccc;
    ` : `
        border-color: transparent;
        opacity:.7;
    `}
    height:40px;
    padding:2px;
    cursor:pointer;
    border-radius: 5px;
`;

const BigImageWrapper = styled.div`
    text-align:center;
`;

const SmallImageWrapper = styled.div`
    text-align:center;
`;

export default function ProductImages({images}){
    const [activeImage , setActiveImage] = useState(images?.[0]);
    return(
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} />
            </BigImageWrapper>
                
            <ImageButtons>
                {images.map(image => (
                    <ImageButton key={image} active={image === activeImage} onClick={() => setActiveImage(image)}>
                        <Image src={image} alt="Product Thumbnail"/>
                    </ImageButton>
                ))}
            </ImageButtons>
                        
        </>
    );
}