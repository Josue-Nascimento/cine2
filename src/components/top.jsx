import styled from "styled-components"
import { BsFillCameraReelsFill } from "react-icons/bs";

export default function Top(){
    return(
        <ContainerTop>
       <BsFillCameraReelsFill/>CineFlex
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
font-size:  50px;
color: #6c6a6a;
svg{
    margin-right: 20px;
}
`