import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SessionSeats() {
  const [seats, setSeats] = useState([]);
  const [infoSelected, setInfoSelected] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

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
  }, [idTime]);

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <ContainerSessionSeats>
      <h2>Escolha o(s) assento(s)</h2>
      <ContainerSeats>
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            className={
              selectedSeats.includes(seat.id)
                ? "redDiv"
                : seat.isAvailable
                ? "green"
                : "image"
            }
            onClick={() =>
              seat.isAvailable
                ? toggleSeatSelection(seat.id)
                : alert("Assento indisponível!")
            }
          >
            {seat.name}
          </Seat>
        ))}
        <Divider />
        <Legend>
          <LegendItem>
            <div className="redDiv"></div>
            <h2>Selecionado</h2>
          </LegendItem>
          <LegendItem>
            <div className="green"></div>
            <h2>Disponível</h2>
          </LegendItem>
          <LegendItem>
            <div className="image"></div>
            <h2>Indisponível</h2>
          </LegendItem>
        </Legend>
      </ContainerSeats>

      <MovieSelected>
        <InfoSelectedMovie>
          <h2>{infoSelected.title}</h2>
          <h2>
            {dataSelected.weekday} {dataSelected.date}
          </h2>
        </InfoSelectedMovie>
        <img src={infoSelected.posterURL} alt="Poster do filme" />
      </MovieSelected>
    </ContainerSessionSeats>
  );
}

// Estilos
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
`;

const Seat = styled.p`
  padding: 10px;
  font-size: 15px;
  border-radius: 15px;
  height: 12%;
  width: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  cursor: pointer;

  &.green {
    background-color: #0e7d71; /* Disponível */
  }

  &.redDiv {
    background-color: #ee897f; /* Selecionado */
  }

  &.image {
    background-color: #747474b1; /* Indisponível */
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: #747474b1;
  margin: 0 auto;
  margin-top: 5px;
`;

const Legend = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 15px;
    margin-top: 5px;
  }

  div {
    width: 23px;
    height: 23px;
    border-radius: 20px;
  }

  .green {
    background-color: #0e7d71;
  }

  .redDiv {
    background-color: #ee897f;
  }

  .image {
    background-color: #747474b1;
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
  }

  img {
    width: 60px;
  }
`;

const InfoSelectedMovie = styled.div``;
