import { React, useState, useEffect } from 'react'
import Axios from 'axios';
import { notification, Divider } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import youtubeAPI from '../youtubeAPI.json';
import "../static/CSS/DiaryDetail.css";
import DiaryDetailYoutubeInfo from './DiaryDetailYoutubeInfo';
import { useMediaQuery } from 'react-responsive'

const DiaryDetailYoutube = (props) => {
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 999 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 1000 })
    return isNotMobile ? children : null
  }
  

    const bestEmotionName = props.bestEmotionName;
    const keyword = props.keyword;
    const [params, setParams] = useState({
        key: youtubeAPI.REACT_APP_YOUTUBE_API_KEY2,
        part: 'snippet',
        q: `playlist ${bestEmotionName}`+`${keyword}`, //키워드랑 감정분석 결과 넣기
        maxResults: 3,
        type: 'video',
        videoDuration: 'long'
    })

    const [youtubeVideos, setYoutubeVideos] = useState([]);

    const youtube = async () => {
        try{
          const response = await Axios.get(`https://www.googleapis.com/youtube/v3/search`, { params });
          setYoutubeVideos(response.data.items);
          
        }
        catch{
          notification.open({
            message: "추천 음악을 불러오지 못했습니다",
            description : "새로고침을 해주세요",
            icon: <FrownOutlined style={{ color: "#108ee9" }} />,
            placement: 'bottomeRight'
          });
        }
    
      }

      useEffect(() => {
        youtube();

      }, [])
      
    return (
        <div>
            <div className="recommendMusic" >
                <div className='recommendMusicTitle'>
                    <h4>추천 플레이리스트 🎶</h4>
                </div>
                <Default>
                <div className="mt-3">
                    {youtubeVideos.slice(0, 3).map((element) => {
                        return (
                        <div>  
                          <div style={{display : "flex", justifyContent : "space-evenly"}}>
                            <iframe className="iframeYoutube" src={`https://www.youtube.com/embed/${element.id.videoId}`}
                                frameborder='0' allow='accelerometer; autoplay; clip-board-write; gyroscope; picture-in-picture'
                                allowFullscreen></iframe>
                            <div>
                              <DiaryDetailYoutubeInfo youtubeVideos={element.snippet}/>
                              </div>    
                                
                                </div>
                                <Divider/></div>)
                    })}</div></Default>
                  <Mobile>
                  <div className="mt-3">
                    {youtubeVideos.slice(0, 3).map((element) => {
                        return (
                        <div>  
                          <div style={{}}>
                            <iframe className="iframeYoutubeMobile" src={`https://www.youtube.com/embed/${element.id.videoId}`}
                                frameborder='0' allow='accelerometer; autoplay; clip-board-write; gyroscope; picture-in-picture'
                                allowFullscreen></iframe>
                            <div>
                              <DiaryDetailYoutubeInfo youtubeVideos={element.snippet}/>
                              </div>    
                                
                                </div>
                                <Divider/></div>)
                    })}</div>
                  </Mobile>
            </div>

        </div>

    )
}

export default DiaryDetailYoutube