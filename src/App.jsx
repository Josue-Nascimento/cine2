import styled from "styled-components";
import MovieSession from "./components/movieSession";
import Top from "./components/top";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SessionTime from "./components/sessionTime";
import SessionSeats from "./components/sessionSeats";

function App() {
  return (
    <ContainerApp>
      <Top/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <MovieSession/>}/>
          <Route path="/SessionTime/:idMovies" element={<SessionTime/>}/>
          <Route path="/SessionSeats/:idTime" element={<SessionSeats/>}/>
        </Routes>
      </BrowserRouter>
    </ContainerApp>
  );
}
const ContainerApp = styled.div`
  background-color: #212226;
  width: 100%;
  min-height: 100vh;
  color: white;
`;
export default App;
