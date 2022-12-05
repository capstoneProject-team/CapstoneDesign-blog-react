import React, {useEffect} from 'react'
import { Button } from 'react-bootstrap';
import "../static/CSS/MainBanner.css"
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";


const MainBanner = () => {
    const nickname = localStorage.getItem('nickname') || '반가운';

    useEffect(() => {
        AOS.init();
      })
    

    return (
        <div className='mainBannerBox' style={{ padding: "50px" }}>
            <div className="bannerContent">
                <div>
                <div data-aos="fade-down" data-aos-duration="1500" >
                    <b><p style={{fontSize : "20pt"}}>{nickname}님, 오늘 하루 어떠셨나요? <br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</p></b></div>
                    <br />
                    <Link to="/diary-create"><Button style={{ backgroundColor : "#4A93FF" , border : "none"}}>일기 쓰러가기</Button></Link>
                </div>
            </div>


        </div>
    )
}

export default MainBanner