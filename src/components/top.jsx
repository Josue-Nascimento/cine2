import styled from "styled-components"
import { BsFillCameraReelsFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Top(){
    return(
        <ContainerTop>
       <BsFillCameraReelsFill/><h1>CineFlex</h1>
        </ContainerTop>
    )
}

const ContainerTop = styled.div`
background-color: #ee897f;
width: 100%;
height: 90px;
display: flex;
justify-content: center;
align-items: center;
h1, svg{
    font-size:  50px;
    color: #ffffff9c;
}
svg{
    margin-right: 20px;
}
`