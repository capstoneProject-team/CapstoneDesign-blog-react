import React from 'react'

const DiaryDetailYoutubeInfo = ({youtubeVideos}) => {
    
    const youtubeTitle = youtubeVideos.title;
    const youtubeChannelTitle = youtubeVideos.channelTitle;
    const youtubeDescription = youtubeVideos.description;

    return (
        <div style={{marginRight : "50px", textAlign : "start", width : "400px", margin:"10px"}}>                           
            <div>{youtubeChannelTitle}</div>
            <br/>
            <h5>{youtubeTitle}</h5>
            <br/>
            <br/>

            <div style={{fontSize : "11pt", color: "grey"}}>{youtubeDescription}</div>
            </div>
    )
}

export default DiaryDetailYoutubeInfo