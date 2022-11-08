import { React, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import getStorageItem from '../utils/useLocalStorage';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import logo from '../image/logo.png';
import { Routes, Route, Link } from "react-router-dom";

const MainBanner = (props) => {
    const token = getStorageItem('jwtToken', '')[0];
    const { nickname } = jwt_decode(token);
    let today = props.todayYear + "-" + props.todayMonth + "-" + props.todayDate;
    
    //백에서 불러올 데이터
    let diaryDateData = ['2022-10-29', 'x', '2022-10-25', 'x', '2022-10-23', '2022-10-22', '2022-10-21'] //다이어리 작성 날짜
    let diaryEmotionData = ['angry', 'x', 'happy', 'x', 'sad', 'angry', 'sad', 'happy'] //다이어리 작성 날짜
    
    // //오늘 일기가 없는 경우
    const [bannerDefault, setBannerDefault] = useState(true);

    //오늘 일기가 있는 경우
    const [bannerHappy, setBannerHappy] = useState(false);
    const [bannerSad, setBannerSad] = useState(false);
    const [bannerAngry, setBannerAngry] = useState(false);
    const [bannerHurt, setBannerHurt] = useState(false);
    const [bannerAnxious, setBannerAnxious] = useState(false);
    const [bannerStatrled, setBannerStatrled] = useState(false);

   
    const setBannerContent = () => {
        if (diaryDateData[0] == today) {
            switch (diaryEmotionData[0]) {
                case "happy":
                    setBannerHappy(true)
                    setBannerSad(false);
                    setBannerAngry(false);
                    setBannerHurt(false);
                    setBannerAnxious(false);
                    setBannerStatrled(false);
                    setBannerDefault(false);
                    break;
                case "sad":
                    setBannerHappy(false)
                    setBannerSad(true);
                    setBannerAngry(false);
                    setBannerHurt(false);
                    setBannerAnxious(false);
                    setBannerStatrled(false);
                    setBannerDefault(false);
                    break;
                case "angry":
                    setBannerHappy(false)
                    setBannerSad(false);
                    setBannerAngry(true);
                    setBannerHurt(false);
                    setBannerAnxious(false);
                    setBannerStatrled(false);
                    setBannerDefault(false);
                    break;
                case "hurt":
                    setBannerHappy(false)
                    setBannerSad(false);
                    setBannerAngry(false);
                    setBannerHurt(true);
                    setBannerAnxious(false);
                    setBannerStatrled(false);
                    setBannerDefault(false);
                    break;
                case "anxious":
                    setBannerHappy(false)
                    setBannerSad(false);
                    setBannerAngry(false);
                    setBannerHurt(false);
                    setBannerAnxious(true);
                    setBannerStatrled(false);
                    setBannerDefault(false);
                    break;
                case "statrled":
                    setBannerHappy(false)
                    setBannerSad(false);
                    setBannerAngry(false);
                    setBannerHurt(false);
                    setBannerAnxious(false);
                    setBannerStatrled(true)
                    setBannerDefault(false);;
                    break;
            }
        } else {
            setBannerDefault(true);
            setBannerHappy(false)
            setBannerSad(false);
            setBannerAngry(false);
            setBannerHurt(false);
            setBannerAnxious(false);
            setBannerStatrled(false)
        }

    }
    useEffect(() => {
        setBannerContent();
    }, [])
    return (
        <div className='box' style={{ padding: "30px" }}>
            {bannerDefault && <div className="bannerContent">
                <div>
                    <h4>{nickname}님, 오늘 하루 어떠셨나요? <br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />
                    <Link to="/diary-create"><Button>일기 쓰러가기</Button></Link></div>

                <div className='bannerImage'>
                    <img src={logo} width="200" height="200" />
                    </div>
            </div>}

            {/* happy */}
            {bannerHappy && <div className="bannerContent" >
                <div>
                    <h4>{nickname}님, 기쁜 하루<br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />

                    <Link to="/diary-detail"><Button>일기장 보기</Button></Link></div>
                <div className='bannerImage'>
                    <img src={logo} width="350" height="250" />
                </div></div>}

            {/* 슬픔 */}
            {bannerSad && <div className="bannerContent">
                <div>
                    <h4>{nickname}님, 슬픈 하루<br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />

                    <Link to="/diary-detail"><Button>일기장 보기</Button></Link></div>
                <div className='bannerImage'>
                    <img src={logo} width="350" height="250" />
                </div></div>}


            {/* 화남 */}
            {bannerAngry && <div className="bannerContent">
                <div>
                    <h4>{nickname}님, 화난 하루 <br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />

                    <Link to="/diary-detail"><Button>일기장 보기</Button></Link></div>
                <div className='bannerImage'>
                    <img src={logo} width="350" height="250" />
                </div></div>}


            {/* 상처 */}
            {bannerHurt && <div className="bannerContent">
                <div>
                    <h4>{nickname}님, 상처받은 하루<br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />

                    <Link to="/diary-detail"><Button>일기장 보기</Button></Link></div>
                    <div className='bannerImage'>
                        <img src={logo} width="350" height="250" />
                    </div></div>}

            {/* 불안 */}
            {bannerAnxious && <div className="bannerContent">
                <div>
                    <h4>{nickname}님, 불안한 하루<br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />

                    <Link to="/diary-detail"><Button>일기장 보기</Button></Link></div>
                    <div className='bannerImage'>
                        <img src={logo} width="350" height="250" />
                    </div></div>}

            {/* 당황 */}
            {bannerStatrled && <div className="bannerContent">
                <div>
                    <h4>{nickname}님, 당황스러운 하루 <br />
                        <br />
                        일상을 기록하고 <br /> 근사한 밤을 보내세요!</h4>
                    <br />
                    <Link to="/diary-detail"><Button>일기장 보기</Button></Link></div>
                <div className='bannerImage'>
                    <img src={logo} width="350" height="250" />
                </div></div>}
        </div>
    )
}

export default MainBanner