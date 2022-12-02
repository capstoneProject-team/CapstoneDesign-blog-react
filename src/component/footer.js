import React from 'react'
import {Divider} from 'antd';

const footer = () => {
  return (
    <div style={{textAlign : "center", paddingLeft : "8%", paddingRight:"8%"}}>
        <Divider/>
        <p style={{fontSize:"10pt", color:"grey"}}>© 2022 HaruEmotionDiary, All rights reserved.</p>
        <br/><br/>
    </div>
  )
}

export default footer