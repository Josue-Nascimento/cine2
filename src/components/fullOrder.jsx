import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";


export default function FullOrder({orderPlaced}) {
  const {filme, data, hora, nomeComprador, CPF, assentos} = orderPlaced;
  return( <ContainerFullOrder>
     <h1><FaCheckCircle/> Pedido Finalizado</h1>
      <InfoFullOrder>
        <h1>Filme e sessão</h1>
        <Divider/>
          <p>{filme}</p>
          <p>{data} ás {hora}</p>
          <h1>Ingressos</h1>
          <p>Assento {assentos}</p>
          <h1>Comprador(a)</h1>
          <Divider/>
          <p>Nome: {nomeComprador}</p>
          <p>CPF: {CPF}</p>
      </InfoFullOrder>
    </ContainerFullOrder>);
}

const ContainerFullOrder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1, svg{
    font-size: 30px;
    color:#9db899 ;
    display: flex;
  justify-content: center;
  }
  svg,h1 {
    font-size: 26px;  
    margin-right: 5px;
    }
`

const InfoFullOrder = styled.div`
background-color:#2b2d36 ;
width: 90%;
margin-top: 10px;
display: flex;
flex-direction: column;
justify-content: center;
text-align: left;
h1{
  color: #ee897f;
  padding: 5px;
}
p{
  margin-left: 18px;
  margin-bottom: 5px;
  font-size:20px;
  padding: 2px;
}

`
const Divider = styled.div`
  width: 95%;
  height: 1px;
  background-color: #747474b1;
  margin: 0 auto;
  margin-top: 5px;
`;