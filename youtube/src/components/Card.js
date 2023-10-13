import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

import Logo from "../img/yt-logo.jpg"
import { useSelector } from "react-redux";


const Card = ({ type, video }) => {
  const [channel, setChannel] = useState(null); // Initialize channel as null



  useEffect(() => {
    const fetchChannel = async () => {
      try {
<<<<<<< HEAD
        const res = await axios.get(`https://amantube.onrender.com/api/users/find/${video.userId}`);
=======
        const res = await axios.get(`https://youtubes-app-1ktq.onrender.com/api/users/find/${video.userId}`);
>>>>>>> 4dadae882997f2925fed68344dbbf9432f0e4522
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };
    fetchChannel();
  }, [video.userId]);




  return (


    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        {/* <Image type={type} src={video?.videoUrl} /> */}


        <video type={type} controls style={{ width: '100%', height: "220px" }}>
          <source src={video?.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>







        <Details type={type}>
          <ChannelImage type={type} src={video?.imgUrl} />
          <Texts>
            <Title>{video.title}</Title>

            <Views>
              <ChannelName>{channel ? channel.name : 'Loading...'} </ChannelName>
              <Info>{video.views} views • {format(video.createdAt)}</Info>
            </Views>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;



const Container = styled.div`
  width: ${(props) => props.type === "sm" ? "280px" : "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  padding-bottom:15px;
 color: ${({ theme }) => theme.text};
  @media (min-width: 320px) and (max-width:767px){
flex-direction: column; 
width: 100%;
margin: auto;


}

@media (min-width: 768px) and (max-width:1024px){
   width: ${(props) => props.type === "sm" ? "260px" : "260px"};
  flex-direction: ${(props) => props.type === "sm" ? "column" : ""}; 

}
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
  @media (min-width: 320px) and (max-width:767px){
padding: 10px 20px;
margin-top: 0px;

}
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`

@media (min-width: 320px) and (max-width:767px){
  display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

}`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (min-width: 320px) and (max-width:767px){
    font-size: 10px;
    font-weight: 400;

}
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
  @media (min-width: 320px) and (max-width:767px){
    font-size: 11px;
    margin: 0px;

}
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  @media (min-width: 320px) and (max-width:767px){
    font-size: 11px;

}
`;

const Views = styled.div`
 @media (min-width: 320px) and (max-width:767px){
width: 40%;

}
`
