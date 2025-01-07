import styled from "styled-components"
import MovieSession from "./components/movieSession"
import Top from "./components/top"

function App() {
  return (
    <ContainerApp>
    <Top/>
    <MovieSession/>
    </ContainerApp>
  )
}
const ContainerApp = styled.div`
background-color:#212226;
width: 100%;
min-height: 100vh;
color: white;
`
export default App
