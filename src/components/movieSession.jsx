import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link} from "react-router-dom";
export default function MovieSession() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const requisition = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies`
    );
    requisition.then((res) => {
      setMovie(res.data);
    });
    requisition.catch(err => {
        console.log(err.response.data)
    })
    if(movie === 0){
      <p>Carregando...</p>
    }
  }, []);
  return (
    <ContainerMovieSession>
      <h1>Em cartáz</h1>
      <MovieContainer>
        {movie.map((movies) => (
          <StyledMovies key={movies.id}>
            <Link to={`/SessionTime/${movies.id}`}>
            <img src={movies.posterURL} />
            </Link>
          </StyledMovies>
        ))}
      </MovieContainer>
    </ContainerMovieSession>
  );
}

const ContainerMovieSession = styled.div`
  //font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  h1{
    font-size: 35px;
    font-weight: bold;
    color: white;
  }
`;
const MovieContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;
const StyledMovies = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;

  img {
    width: 80%;
    margin: 10px;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    border: 1px solid white ;
  }
`;
