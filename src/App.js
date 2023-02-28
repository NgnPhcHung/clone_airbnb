import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppLayout from "./Components/Layout/AppLayout";
import Home from "./Pages/Home";
import RoomInfor from "./Pages/RoomInfor";
import GlobalStyles from "./Style/GlobalStyle";
import {light} from './Style/Theme'

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home/>} />
            <Route path="room/:roomId" element={<RoomInfor />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
