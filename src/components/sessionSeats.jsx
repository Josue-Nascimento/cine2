import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SessionSeats() {
  const [seats, setSeats] = useState([]);
  const [infoSelected, setInfoSelected] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  console.log(seats);
  const { idTime } = useParams();
  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idTime}/seats`
    );
    promisse.then((res) => {
      setSeats(res.data.seats);
      setInfoSelected(res.data.movie);
      setDataSelected(res.data.day);
    });
  }, []);
  return (
    <ContainerSessionSeats>
      <h2>Escolha o(s) assento(s)</h2>
      <ContainerSeats>
        {seats.map((a) => (
          <p>{a.name}</p>
        ))}
      </ContainerSeats>
      <MovieSelected>
        <InfoSelectedMovie>
          <h2>{infoSelected.title}</h2>
          <h2>
            {dataSelected.weekday} {dataSelected.date}
          </h2>
        </InfoSelectedMovie>
        <img src={infoSelected.posterURL} />
      </MovieSelected>
    </ContainerSessionSeats>
  );
}

const ContainerSessionSeats = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  h2 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const ContainerSeats = styled.div`
  height: 250px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  p {
    padding: 10px;
    font-size: 15px;
    background-color: #ee897f;
    border-radius: 15px;
    height: 10px;
    width: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px;
  }
`;
const MovieSelected = styled.div`
  background-color: #ee897f;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h2 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    margin-right: 10px;
  }
  img {
    width: 60px;
  }
`;
const InfoSelectedMovie = styled.div``;
