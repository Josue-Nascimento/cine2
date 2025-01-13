import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsFillCameraReelsFill } from "react-icons/bs";


export default function SessionTime() {
  const [dataFilm, setDataFilm] = useState([]);
  const [chosenFilm, setChosenFilm] = useState([])
  const { idMovies } = useParams();
  console.log(idMovies);
  useEffect(() => {
    const requisition = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovies}/showtimes`
    );
    requisition.then((res) => {
      setDataFilm(res.data.days);
      setChosenFilm(res.data)
    });
    requisition.catch((err) => {
      console.log(err.response.data);
    });
  }, []);
  return (
    <ContainerSessionTime>
      <h1>Selecionar horarios</h1>
      {dataFilm.map((f) => (
        <ContainerDateHours key={f.id}>
          <Date>
            <FaCalendarAlt />
            <p>
              {f.weekday} - {f.date}
            </p>
          </Date>
          <Divider />
          <Hours>
            {f.showtimes.map((h) => (
              <Link to={`/SessionSeats/${h.id}`}><p key={h.id}>{h.name}</p></Link>
            ))}
          </Hours>
        </ContainerDateHours>
      ))}
          <MovieSelected>
            <h2><BsFillCameraReelsFill/>{chosenFilm.title}</h2>
            <img src={chosenFilm.posterURL}/>
           
          </MovieSelected>
    </ContainerSessionTime>
  );
}

const ContainerSessionTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  h1 {
    font-size: 30px;
    padding: 20px;
  }
`;
const ContainerDateHours = styled.div`
  background-color: #424343;
  width: 350px;
  min-height: 150px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Date = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg,
  p {
    color: #ee897f;
    font-size: 30px;
    margin-right: 20px;
  }
  p {
    color: white;
    font-size: 20px;
    margin-left: 20px;
  
  }
`;

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: #747474b1;
  margin: 0 auto; /* Centraliza horizontalmente */
  margin-top: 5px;
`;

const Hours = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
  p {
    padding: 10px;
    width: 50px;
    border: solid #ee897f 2px;
    border-radius: 10px;
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;
    justify-content: center;
    text-decoration: none;
    color: #ee897f !important;
  }
`;
const MovieSelected = styled.div`
    background-color: #ee897f ;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h2{
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg{
    margin-right: 10px;
  }
  img{
    width: 60px;
  }
`
