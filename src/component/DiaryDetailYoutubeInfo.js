import React from 'react'
import { useMediaQuery } from 'react-responsive';

const DiaryDetailYoutubeInfo = ({youtubeVideos}) => {
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 999 })
        return isMobile ? children : null
      }
      const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 1000 })
        return isNotMobile ? children : null
      }
      
      
    const youtubeTitle = youtubeVideos.title;
    const youtubeChannelTitle = youtubeVideos.channelTitle;
    const youtubeDescription = youtubeVideos.description;

    return (
        <div>
            <Default>
        <div style={{marginRight : "50px", textAlign : "start", width : "400px", margin:"10px"}}>                           
            <div>{youtubeChannelTitle}</div>
            <br/>
            <h5>{youtubeTitle}</h5>
            <br/>
            <br/>

            <div style={{fontSize : "11pt", color: "grey"}}>{youtubeDescription}</div>
            </div></Default>
            <Mobile>
        <div style={{textAlign : "start", marginTop : "10px"}}>                           
            <div>{youtubeChannelTitle}</div>
            <br/>
            <h5>{youtubeTitle}</h5>
            <br/>
            <br/>

            <div style={{fontSize : "11pt", color: "grey"}}>{youtubeDescription}</div>
            </div></Mobile>
            
            </div>
    )
}

export default DiaryDetailYoutubeInfo