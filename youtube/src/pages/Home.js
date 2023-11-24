
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";




const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: 320px) and (max-width:767px){
 display:flex;
 gap:10px;
 flex-direction: column;

}
`;


const Home = ({ type }) => {

    const [videos, setVideos] = useState([])
    axios.defaults.withCredentials = true

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const axiosInstance = axios.create({
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                const res = await axiosInstance.get(`https://amanytbes.onrender.com/api/videos/${type}`);
                // Filter out duplicate videos based on unique _id
                const uniqueVideos = res.data.filter((video, index, self) =>
                    index === self.findIndex((v) => v._id === video._id)
                    //self is a reference to the original array, which is res.data in this case.
                );
                setVideos(uniqueVideos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {videos.map((video) => (
                <Card key={video._id} video={video} />


            ))}
        </Container>
    )
}

export default Home
