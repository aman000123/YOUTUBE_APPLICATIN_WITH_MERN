import styled, { ThemeProvider } from "styled-components";
import './App.css';
import Menu from "./components/menu";
import Navbar from "./components/navbar";
import { ToastContainer, toast } from 'react-toastify';
import { darkTheme, lightTheme } from "./Utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import Search from "./pages/search";
import Signup from "./pages/Signup";



const Container = styled.div`
display:flex;
@media (min-width: 320px) and (max-width:767px){

  height: fit-content;

}
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;


const Wrappper = styled.div`
padding:22px 22px 22px 22px;
z-index:-111111 !important;
height:100vh;


@media (min-width: 320px) and (max-width:767px){

height: fit-content;

}`;


function App() {

  const [darkMode, setDarkMode] = useState(true);

  //change dark mode store state in local storeage
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>

          {/*menu */}
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          {/*main */}
          <Main>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrappper>


              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="signin" element={<Signin />} />



                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrappper>

          </Main>
        </BrowserRouter>
      </Container>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
