

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";


const Container = styled.div`
  flex: 2;

  @media (min-width:760px)and (max-width:1024px){

    flex: 2;
    display: flex;
    justify-content: space-between;
    


}

`;


const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`https://amanytbes.onrender.com/api/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

    return (
        <Container>
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </Container>
    );
};
export default Recommendation