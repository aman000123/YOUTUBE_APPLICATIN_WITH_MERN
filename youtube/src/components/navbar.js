
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Upload from "./Upload";
import Menu from "./menu";
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';

const Navbar = ({ setDarkMode, darkMode }) => {

  const { currentUser } = useSelector(state => state.user)
  const { currentVideo } = useSelector(state => state.video)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("");
  const [isListIconClicked, setIsListIconClicked] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIsListIconClicked(!isListIconClicked); // Toggle the state when list icon is clicked
  };
  return (
    <>
      <>
        <MenuContainer menuOpen={menuOpen}>
          {menuOpen && <Menu
            isListIconClicked={isListIconClicked}
            darkMode={darkMode}
            toggleMenu={toggleMenu}
            setDarkMode={setDarkMode}
          />}
        </MenuContainer>
        <Container>

          <Wrappper>
            {(window.innerWidth >= 360 && window.innerWidth <= 768) && (
              // <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Logo onClick={toggleMenu}>
                {isListIconClicked ? (
                  <CloseIcon />
                ) : (
                  <ExploreIcon style={{ fontSize: "36px" }} />
                )}
              </Logo>

            )}
            <Search>
              <Input placeholder="Just Search" onChange={(e) => setQ(e.target.value)} />
              <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
              {currentUser ?

                (<User>
                  <VideoUpload><VideoCallOutlinedIcon onClick={() => setOpen(true)}>
                  </VideoCallOutlinedIcon></VideoUpload>
                  <Avatar src={currentVideo?.imgUrl} />
                  {currentUser.name}
                </User>
                )

                : (<Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}> <Button><AccountCircleOutlinedIcon /> Sign in</Button>
                </Link>)}

            </Search>
          </Wrappper>
        </Container >
        {open && <Upload setOpen={setOpen} />}
      </>
    </>
  )
}
export default Navbar









const MenuContainer = styled.div`
position: fixed;
top: 50px;
left: ${({ menuOpen }) => (menuOpen ? "0" : "-250px")};
width: 200px;
height: 100%;
max-height: calc(100vh - 50px); /* Limit the height to the viewport height minus the top bar height */
background-color: ${({ theme }) => theme.bgLighter};
         color: ${({ theme }) => theme.text};
transition: left 0.3s ease-in-out;
z-index: 11111111;
@media (min-width: 320px) and (max-width:767px){

  overflow-y: auto; /* Add vertical scrolling when content overflows */
  

}



`;


const Logo = styled.div`
cursor: pointer;
color: ${({ theme }) => theme.text}; // Set the color from the theme
font-size: 40px;
width: 40px;


&:hover {
  color: ${({ theme }) => theme.hoverColor}; // Change color on hover based on the theme
}
@media (min-width: 320px) and (max-width:767px){

  /* background-color: ${({ theme }) => theme.bgLighter}; */
         color: ${({ theme }) => theme.text};
         width: 40px;
    height: 40px;
    border-radius: 50%;

;

}
@media (min-width:760px)and (max-width:1024px){

display: none;


}
`;




const Img = styled.img`
height:50px`;


const Container = styled.div`
  position: sticky !important;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 111111111 !important;
  @media (min-width: 320px) and (max-width:767px){
    z-index: 111111111 !important;
width: 100%;
background-color: ${({ theme }) => theme.bgLighter};
/* background-color: red */

@media (max-width: 380px){
  /* background-color: red; */
  border: 1px solid #ccc;
  width: 97%;
   border-radius: 5px;
    margin: auto;
    /* top: 0px; */
    z-index: 111111111 !important;
}


}



`;


const Wrappper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 16px;
  position: relative;
  @media (min-width: 320px) and (max-width:767px){ 
    /* width: 100%; */
    /* background-color:red; */
  
  flex-direction: row-reverse;
  padding: 0px 0px 0px 20px;
    /* border: 1px solid #ccc; */
}
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  @media (min-width: 320px) and (max-width:767px){ 
    width: 60%;
    padding:3px 10px;
    color: ${({ theme }) => theme.text};
    border: none;
    left:100px
}
@media (min-width:760px)and (max-width:1024px){

width: 90%;
padding: 5px 12px;
color: ${({ theme }) => theme.text};


}
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  @media (min-width: 320px) and (max-width:767px){ 
    width: 90px;
   
}


`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  @media (min-width: 320px) and (max-width:767px){ 
width: max-content;
padding: 3px 7px;
   
}
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (min-width:760px){

gap:12px


}
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;


const VideoUpload = styled.div`
cursor: pointer;`
