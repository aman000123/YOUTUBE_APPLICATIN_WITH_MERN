
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signinStart, signinSuccess, signininFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify'


const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnSignup = async (e) => {
        e.preventDefault();
        // Reset previous error messages
        setValidationErrors({});
        // Create a new erors object
        const errors = {};

        // Simple client-side validation
        if (!name || !email || !password) {
            errors.allFields = "Please fill all fields.";
        }

        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(name)) {
            errors.name = "Name should contain only alphabet characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (password.length < 4) {
            errors.password = "Password must be at least 4 characters long.";
        }

        // Set the errors object in the state
        setValidationErrors(errors);
        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            return;
        }
        dispatch(signinStart());

        try {

            const res = await axios.post("https://amanytbes.onrender.com/api/auths/signup", { name, password, email }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            console.log('res in signInWithPopup', res)
            dispatch(signinSuccess(res.data));
            navigate("/signin");
        } catch (err) {
            toast.error(err.response?.data?.message)
            console.log("err in signup", err.response.data)
            dispatch(signininFailure());
        }
    };
    return (
        <Container>
            <Wrapper>
                <Title>Sign up</Title>
                <SubTitle>To Continue with AmanTube</SubTitle>

                <Input
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}

                />
                {validationErrors.name && <Error>**{validationErrors.name}</Error>}

                <Input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}

                />
                {validationErrors.email && <Error>**{validationErrors.email}</Error>}


                <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}

                />
                {validationErrors.password && <Error>**{validationErrors.password}</Error>}


                <Buttons>
                    <Button
                        onClick={() => navigate("/signin")}
                    >Log in</Button>
                    <Button onClick={handleOnSignup}>Sign up</Button>

                </Buttons>
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

export default Signup





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

const Error = styled.div`
color:red;`
