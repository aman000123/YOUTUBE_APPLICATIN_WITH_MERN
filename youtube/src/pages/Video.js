import styled from "styled-components"
import Images from "../img/corey-frederick.png"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Logo from "../img/yt-logo.jpg"
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchSuccess, like, dislike, incrementViews } from "../redux/videoSlice";

import { subscription } from "../redux/userSlice"
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";
import { toast } from "react-toastify";


const Video = () => {


  const { currentUser } = useSelector((state) => state.user);
  console.log("  currentUser=======>>==", currentUser)
  console.log("  currentUser.subscribedUsers==--=====>>", currentUser?.userData?.subscribedUsers)
  const { currentVideo } = useSelector((state) => state.video);

  const [commentShow, setCommentShow] = useState(false)

  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")[2];
  // console.log(path) fetch video is from path
  //  console.log("currentVideo", currentVideo, path)


  const token = localStorage.getItem("access_token");






  const [chanel, setChanel] = useState({})
  const [hasViewed, setHasViewed] = useState(false);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`https://amanytbes.onrender.com/api/videos/find/${path}`)
        const chanelRes = await axios.get(`https://amanytbes.onrender.com/api/users/find/${videoRes.data.userId}`);

        const hasIncrementedViews = localStorage.getItem(`hasIncrementedViews_${videoRes.data._id}`);
        if (!hasIncrementedViews) {

          await axios.put(`https://amanytbes.onrender.com/api/videos/view/${videoRes.data._id}`);

          localStorage.setItem(`hasIncrementedViews_${videoRes.data._id}`, "true");
          dispatch(incrementViews());
        }
        setChanel(chanelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      }
      catch (err) {
        //  toast.error(err.response.data)

      }
    }
    fetchData()

  }, [path, dispatch, currentUser?.subscribedUsers, currentVideo?._id, hasViewed])
  const handleLike = async () => {

    try {
      const axiosForLike = axios.create({
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      await axiosForLike.put(`https://amanytbes.onrender.com/api/users/like/${currentVideo._id}`)
      console.log('like(currentUser?._id)', like(currentUser?._id))
      dispatch(like(currentUser?._id))
    }
    catch (err) {
      console.log("err.response.data== like", err)
      toast.error("You are not authenticated for Like")

    }
  }
  const handleDislike = async () => {

    try {
      const axiosForDislike = axios.create({
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      await axiosForDislike.put(`https://amanytbes.onrender.com/api/users/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser?._id))

    }
    catch (err) {
      console.log("err.response.data== like", err)
      toast.error("You are not authenticated for Dislike")

    }
  }
  const handleSubscribe = async () => {

    try {
      const axiosForSub = axios.create({
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
          "Content-Type": "application/json",
        },
        withCredentials: true,

      });
      currentUser?.userData?.subscribedUsers?.includes(chanel._id)
        ? await axiosForSub.put(`https://amanytbes.onrender.com/api/users/unsub/${chanel._id}`)
        : await axiosForSub.put(`https://amanytbes.onrender.com/api/users/sub/${chanel._id}`);
      dispatch(subscription(chanel._id));
      console.log("current user for subscribe======", currentUser)
    }
    catch (err) {
      console.log("err.response.data== subscribed", err)
      toast.error("You are not authenticated for Subscribed")

    }
  }
  const handleForComment = () => {
    setCommentShow(!commentShow); // Toggle the commentShow state
  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views .  {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>

              {/*check whether user id inside likes button or not*/}
              {currentVideo?.likes?.includes(currentUser?._id) ?
                (
                  <ThumbUpIcon />
                ) : (<ThumbDownIcon />)}{currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (<ThumbDownIcon />)
                : (<ThumbDownOffAltOutlinedIcon />)

              }Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon />Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon />Save
            </Button>
          </Buttons>


        </Details>
        <Hr />

        <Channel>
          <ChannelInfo>
            <Image src={currentVideo?.imgUrl} />
            <ChannelDetail>
              <ChannelName>{chanel.name}</ChannelName>
              <ChannelCounter>{chanel.subscribers} subscribers</ChannelCounter>
              <Description>
                {commentShow ? currentVideo?.desc : currentVideo?.desc.slice(0, 50)}


                <Commentt onClick={handleForComment}> ......{commentShow ? 'Less' : 'More Information'}</Commentt>

              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>{currentUser?.userData?.subscribedUsers?.includes(chanel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>

        </Channel>
        <Hr />
        {commentShow && <Comments videoId={currentVideo?._id} path={path} />}


      </Content>
      <Recommendation tags={currentVideo?.tags} />


    </Container>
  )
}

export default Video






















const Container = styled.div`
display:flex;
gap:24px;
flex-direction: row;


@media (min-width: 320px) and (max-width:767px){
  flex-direction: column;

}


  @media (min-width:760px)and (max-width:1024px){

flex-direction: column;


}


`;

const Content = styled.div`
flex:5`;

const VideoWrapper = styled.div`
`;


const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
  @media (min-width: 320px) and (max-width:767px){
margin: 5px 0px;

}
`;


const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width:767px){
flex-direction: column;
    align-items: baseline;
    font-size: 10px;

}
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  @media (min-width: 320px) and (max-width:767px){
    width: 100%;
    justify-content: end;

}

  
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Commentt = styled.span`
font-size: 15px;
font-weight: 600;
cursor: pointer;
@media (min-width: 320px) and (max-width:767px){
  font-size: 10px;
font-weight: 400;


}
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width:767px){



}
  
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
  @media (min-width: 320px) and (max-width:767px){
margin-bottom: 5px;

}
`;

const Description = styled.p`
  font-size: 14px;
  @media (min-width: 320px) and (max-width:767px){

margin: 6px 0px;
font-size: 10px !important;

}
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  @media (min-width: 320px) and (max-width:767px){
font-size: 10px;
padding:8px 10px;

}
`;

const VideoFrame = styled.video`
  max-height: 430px;
  width: 100%;
  object-fit: cover;
`;
