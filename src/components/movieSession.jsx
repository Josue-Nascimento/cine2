import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
export default function MovieSession() {
  const [movie, setMovie] = useState([]);
  console.log(movie);
  useEffect(() => {
    const requisition = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );
    requisition.then((res) => {
      setMovie(res.data);
    });
  }, []);
  return (
    <ContainerMovieSession>
      Em cartáz
      <MovieContainer>
        {movie.map((movies, id) => (
          <StyledMovies>
            <img src={movies.posterURL} />
          </StyledMovies>
        ))}
      </MovieContainer>
    </ContainerMovieSession>
  );
}

const ContainerMovieSession = styled.div`
  //font-family: Arial, Helvetica, sans-serif;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-weight: bold;
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
