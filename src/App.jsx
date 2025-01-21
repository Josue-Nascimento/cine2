import styled, { createGlobalStyle } from "styled-components";
import MovieSession from "./components/movieSession";
import Top from "./components/top";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionTime from "./components/sessionTime";
import SessionSeats from "./components/sessionSeats";
import FullOrder from "./components/fullOrder";
import { useState } from "react";

function App() {
  const [orderPlaced, setOrderPlaced] = useState({});
  return (
    <>
      <GlobalStyled />
      <ContainerApp>
        <Top />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieSession />} />
            <Route path="/SessionTime/:idMovies" element={<SessionTime />} />
            <Route path="/SessionSeats/:idTime" element={<SessionSeats setOrderPlaced={setOrderPlaced} />} />
            <Route path="/FullOrder" element={<FullOrder orderPlaced={orderPlaced}/>} />
          </Routes>
        </BrowserRouter>
      </ContainerApp>
    </>
  );
}

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
`;

const ContainerApp = styled.div`
  background-color: #212226;
  width: 100%;
  min-height: 100vh;
  color: white;
  overflow: hidden;
`;

export default App;
