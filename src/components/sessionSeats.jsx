import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function SessionSeats({setOrderPlaced}) {
  const [seats, setSeats] = useState([]);
  const [infoSelected, setInfoSelected] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();
  const { idTime } = useParams();

  const HandleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  function MandarDados(e) {
    e.preventDefault();
    const body = {
        ids: selectedSeats,
        name: inputs.name,
        cpf: inputs.cpf,
    };

    const pCompleto = {
      filme: infoSelected.title,
      dia:  dataSelected.weekday,
      data: dataSelected.date,
      hora: dataSelected.showtime,
      nomeComprador: inputs.name,
      CPF: inputs.cpf,
      assentos: selectedSeats.map((seatId) => seats.find((seat) => seat.id === seatId)?.name).join(", Assento"),    }

    if(seats.length !== 0 && inputs.name && inputs.cpf){
      const promisse = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", body)
      promisse.then((res)=>{
        setOrderPlaced(pCompleto)
        navigate("/FullOrder")
      })
    }
  }


  useEffect(() => {
    //https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many

    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idTime}/seats`
    );
    promisse.then((res) => {
      setSeats(res.data.seats);
      setInfoSelected(res.data.movie);
      setDataSelected({
        weekday: res.data.day.weekday,
        date: res.data.day.date,
        showtime: res.data.name, // Adiciona o horário aqui corretamente
      });
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
        <ContainerInputs>
          <form onSubmit={()=> MandarDados()}>
            <p>Nome do comprador(a)</p>
            <input
              name="name"
              type="text"
              placeholder="Escreva seu nome..."
              required
              onChange={HandleInputChange}
            />
            <p>CPF do comprador(a)</p>
            <input
              name="cpf"
              type="number"
              placeholder="Escreva seu CPF..."
              required
              onChange={HandleInputChange}
            />
            <button onClick={MandarDados}>Reservar Assento</button>
          </form>
        </ContainerInputs>
      </ContainerSeats>

      <MovieSelected>
        <InfoSelectedMovie>
          <h2>{infoSelected.title}</h2>
          <h2>
            {dataSelected.weekday} {dataSelected.date} ás {dataSelected.showtime}
          </h2>
        </InfoSelectedMovie>
        <img src={infoSelected.posterURL} alt="Poster do filme" />
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

const ContainerInputs = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  p {
    font-weight: bold;
    font-size: 15px;
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  input,
  button {
    width: 80%;
    height: 18%;
    border-radius: 10px;
    text-decoration: none;
  }

  button {
    background-color: #ee897f;
    font-size: 20px;
    margin-top: 10px;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
