import { useEffect, useState } from "react";
import styled from "styled-components";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import app from "../Firebase"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Upload = ({ setOpen }) => {

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [formValid, setFormValid] = useState(false); // Track form validity



    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };


    //for uploading

    const uploadFile = (file, urlType) => {
        //use fire base uploading process
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );



    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl")

    }, [video])


    useEffect(() => {
        img && uploadFile(img, "imgUrl")

    }, [img])


    useEffect(() => {
        // Check if video, img, and title are set to determine form validity
        if (video && img && inputs.title) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [video, img, inputs.title]);



    const handleUpload = async (e) => {

        try {
            e.preventDefault();

            const axiosForUpload = axios.create({
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                    "Content-Type": "application/json",
                },
                withCredentials: true,

            });
            const res = await axiosForUpload.post("https://amanytbes.onrender.com/api/videos", { ...inputs, tags })
            setOpen(false)
            res.status === 200 && navigate(`/video/${res.data._id}`)

        }
        catch (err) {
            console.log("err in uploading video", err)
            toast.error("You are not authenticated for Uploading video")

        }
    }


    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>

                {videoPerc > 0 ? ("Uploading" + videoPerc + "%") :
                    (<Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />)
                }
                {imgPerc > 0 ? ("Uploading" + imgPerc + "%") : (
                    <Input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                    />)
                }

                <Desc
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separate the tags with commas."
                    onChance={handleTags}
                />

                <Label>Image:</Label>

                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                />

                <Button
                    onClick={handleUpload}
                    disabled={!formValid} // Disable the button if the form is not valid or empty
                    style={{ cursor: formValid ? 'pointer' : 'not-allowed' }} // Set cursor property based on form validity
                >Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload








const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:1000000;
  @media (min-width: 320px) and (max-width:767px){


top: 120px;
}

@media (min-width:760px)and (max-width:1024px){

top: 150px;


}
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;



const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

