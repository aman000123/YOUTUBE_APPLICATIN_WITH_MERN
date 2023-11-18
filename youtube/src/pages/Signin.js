
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth"
import { toast } from 'react-toastify'

const Signin = () => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("https://amanytbes.onrender.com/api/auths/signin", { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          }, // Set the request headers
          withCredentials: true, // Include credentials (cookies) in the request
        });


      // Set the received token into a cookie
      document.cookie = `access_token=${res.data.token}; path=/; domain=.netlify.app; secure; HttpOnly;`;




      dispatch(loginSuccess(res.data));
      console.log("sign in data", res.data)

      navigate("/")
    } catch (err) {
      // toast.error(err.response.data.message)
      toast.error(err.response?.data?.message)
      console.log("erro in login", err)
      dispatch(loginFailure());
    }
  };


  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/api/auths/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };


  return (
    <Container>
      <Wrapper>
        <Title>Log in To AmanTubess</Title>
        <SubTitle>To Continue with AmanTube</SubTitle>
        <Input
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="Password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Buttons>
          <Button
            onClick={() => navigate("/signup")}
          >Sign up</Button>
          <Button
            onClick={handleLogin}
          >Log in</Button>

        </Buttons>
        <Title>or</Title>

        <Button
          onClick={signInWithGoogle}
        >Signin with Google</Button>

      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default Signin


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px);
  color: ${({ theme }) => theme.text};
  @media (min-width: 320px) and (max-width:767px){
    height: calc(100vh - 150px);
    

}
`;

// nav bar height is 56px  soo 100vh -56

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 80px;
  gap: 10px;
  @media (min-width: 320px) and (max-width:767px){
   padding: 20px 62px;

}
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  @media (min-width: 320px) and (max-width:767px){
    font-size: 13px;
    font-weight: 500;

}
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 45px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  
@media (min-width: 320px) and (max-width:767px){
  padding: 10px 14px;

}
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
 
  
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Buttons = styled.div`
display:flex;
justify-content: space-between;
width:100%;
margin-top:10px`
