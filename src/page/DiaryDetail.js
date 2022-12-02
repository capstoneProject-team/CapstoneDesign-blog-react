import { React, useState, useEffect } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import getStorageItem, { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from 'axios';

//antd
import { Divider, notification } from 'antd';
import { MoreOutlined, SmileOutlined, FrownOutlined, LoadingOutlined } from '@ant-design/icons';
import youtubeAPI from  '../youtubeAPI.json';
import moment from 'moment';

const DiaryDetail = ({ setNavVisible }) => {
  setNavVisible(true);

  const navigate = useNavigate();

  const navigateEditDiary = () => {
    navigate(`/diary-edit/${post_id}`)
  }



  const token = getJwtAtStorage(); //getStorageItem('jwtToken', '')[0];
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  //작성글 관련 useState
  const { nickname } = jwt_decode(token);
  const { post_id } = useParams();
  const [created_at, setCreate_at] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [link, setLink] = useState([]);

  //감정관련 useState
  const [happyResult, setHappyResult] = useState([]);
  const [sadResult, setSadResult] = useState([]);
  const [angryResult, setAngryResult] = useState([]);
  const [hurtResult, setHurtResult] = useState([]);
  const [anxiousResult, setAnxiousResult] = useState([]);
  const [statrledResult, setStatrledResult] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [bestEmotion, setBestEmotion] = useState("");
  const [bestEmotionEmoticon, setBestEmotionEmoticon] = useState("");
  const [bestEmotionResult, setBestEmotionResult] = useState("");
  const [bestEmotionName, setBestEmotionName] = useState("");

  const [params, setParams] = useState({
    key: `${youtubeAPI.REACT_APP_YOUTUBE_API_KEY}`,
    part: 'snippet',
    q: `${'슬플 때'}노래모음`,
    maxResults: 10,
    type: 'video',
    videoDuration: 'long'
  });
  const [youtubeVideos, setYoutubeVideos] = useState([]);

  const response = async () => {
    const res = await Axios.get(`http://3.36.254.187:8000/post/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
    const data = res.data;
    console.log(data);
    setCreate_at(data.created_at);
    setTitle(data.title);
    setContent(data.content);
    setPhoto(data.photo);
    if (data.photo == null) {
      setVisiable(false);
      setPhoto(data.photo);
    } else {
      setPhoto(data.photo);
      setVisiable(true);
    }
    setHappyResult(data.happy);
    setSadResult(data.sad);
    setAngryResult(data.angry);
    setHurtResult(data.hurt);
    setAnxiousResult(data.anxious);
    setStatrledResult(data.startled);

    setKeyword(data.keyword);
    setLoadingSpinner(true);
  }

  //테스트 값만 넣어놓은 상태~
  const emotionList = [
    { emotion: "happy", emoticon: "😄", result: 1000, emotionName: "기쁨" },
    { emotion: "sad", emoticon: "😭", result: 2000, emotionName: "슬픔" },
    { emotion: "angry", emoticon: "🤬", result: 3000, emotionName: "분노" },
    { emotion: "hurt", emoticon: "🤕", result: 4000, emotionName: "상처" },
    { emotion: "anxious", emoticon: "😨", result: 5000, emotionName: "불안" },
    { emotion: "statrled", emoticon: "😳", result: 6000, emotionName: "당황" },
  ]

  const emotionResultList = (emotionList) => {
    let emotionResult = emotionList.sort(function (a, b) {
      return b.result - a.result; //내림차순 
    })

    setBestEmotion(emotionResult[0].emotion);
    setBestEmotionResult(emotionResult[0].result);
    setBestEmotionEmoticon(emotionResult[0].emoticon);
    setBestEmotionName(emotionResult[0].emotionName);
  }

  const emotionBackgroundColor = (bestEmotion) => {
    if (bestEmotion == "happy") {
      const happyStyle = {
        backgroundColor: "#FFFFDD",
        borderRadius : "20px",
        padding : "2%"
      }
      return happyStyle;
    }

    else if (bestEmotion == "statrled") {
      const statrledStyle = {
        backgroundColor: "#DDF2F8",
        borderRadius : "20px",
        padding : "2%"
      }
      return statrledStyle;
    }

    else if (bestEmotion == "angry") {
      const angryStyle = {
        backgroundColor: "#F6C8C0",
        borderRadius : "20px",
        padding : "2%"
      }
      return angryStyle;
    }

    else if (bestEmotion == "anxious") {
      const anxiousStyle = {
        backgroundColor: "#F2FAEC",
        borderRadius : "20px",
        padding : "2%"
      }
      return anxiousStyle;
    }
    else if (bestEmotion == "hurt") {
      const hurtStyle = {
        backgroundColor: "#F5EEFE",
        borderRadius : "20px",
        padding : "2%"
      }
      return hurtStyle;
    }
    else if (bestEmotion == "sad") {
      const sadStyle = {
        backgroundColor: "#DDE2F8",
        borderRadius : "20px",
        padding : "2%"
      }
      return sadStyle;
    }

  }


  const youtube = async () => {
    const response = await Axios.get(`https://www.googleapis.com/youtube/v3/search`, { params });
    console.log(response.data.items);
    setYoutubeVideos(response.data.items);
  }

  useEffect(() => {
    response();
    youtube();
    emotionResultList(emotionList);

  }, []);


  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }
  let now = 0;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteDiary = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.delete(`http://3.36.254.187:8000/post/delete/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
      handleClose();
      notification.open({
        message: "일기가 삭제되었습니다.",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
      navigate('/diary-list')
    } catch (e) {
      console.log(e)
      notification.open({
        message: "일기 삭제 실패, 다시 시도해 주세요.",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });

    }
  }
  if (loadingSpinner == false) {
    return (
      <div className='loadingSpinner'>
        <LoadingOutlined style={{ fontSize: 100, color: 'blue', margin: '300px 300px' }} spin />
      </div>
    )
  } else {
    return (
      <div>
        <br />
        <div>
          <Container style={{ paddingLeft: '6%', paddingRight: '6%', border: "1px", borderRadius: "20px" }}>
            <div className='detailTop'>
              <div className='detailTitle'>
                <h2>{title}</h2>
                <br />
              </div>
              <div className='line2' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "-25px" }}>
                <div className='writeDateWho' style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: '10.5pt' }}>
                    {nickname} &nbsp; <span style={{ color: 'grey' }}>{moment(created_at).format('YYYY년 MM월 DD일')}</span> </p>
                </div>
                <Dropdown>
                  <Dropdown.Toggle className="shadow-none" drop="start" key="start"
                    style={{ backgroundColor: "white", border: "none", outline: "none" }}>
                    <MoreOutlined style={{ color: "grey" }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={navigateEditDiary}>수정하기</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow}>삭제하기</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <Divider />
            <div className='body'>
              <div className='detailImage' style={{ textAlign: 'center' }}>
                {console.log(visiable, "이미지")}
                {visiable && <img src={photo} alt='image' style={{ width: 'auto', height: 'auto', maxWidth: "300px", maxHeight: "300px" }} />}</div>
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
            <Divider />


            <div>
              <div className='detailTitle'>
                <h4>일기감정분석결과 📈</h4>
              </div>

            <div className="mt-3" style={emotionBackgroundColor(bestEmotion)}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "3%", paddingRight: "3%" }}>

                <div style={{ display: "flex", width: "70%" }}>
                  <div>
                    <div style={{ fontSize: "40pt" }}>{bestEmotionEmoticon}</div>
                  </div>
                  <div style={{ marginLeft: "5%", marginRight: "5%", width: "250px" }}>
                    <div className='happyNow' style={{ marginBottom: "10px" }}>
                      <p>기쁨 😄</p>
                      <ProgressBar variant="warning" now={30} label={`${now}%`} style={{ height: "25px", marginTop: "-10px", backgroundColor : "white" }} />
                    </div>
                    <div className='sadNow' style={{ marginBottom: "10px" }}>
                      <p>슬픔 😭</p>
                      <ProgressBar variant="warning" now={40} label={`${now}%`} style={{ height: "25px", marginTop: "-10px", backgroundColor : "white"  }} />
                    </div>
                    <div className='angryNow' style={{ marginBottom: "10px" }}>
                      <p>분노 🤬</p>
                      <ProgressBar variant="warning" now={50} label={`${now}%`} style={{ height: "25px", marginTop: "-10px", backgroundColor : "white"  }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: "5%", marginRight: "5%", width: "250px" }}>
                    <div className='statrledNow' style={{ marginBottom: "10px" }}>
                      <p>당황 😳</p>
                      <ProgressBar variant="warning" now={60} label={`${now}%`} style={{ height: "25px", marginTop: "-10px", backgroundColor : "white"  }} />
                    </div>
                    <div className='hurtNow' style={{ marginBottom: "10px" }}>
                      <p>상처 🤕</p>
                      <ProgressBar variant="warning" now={70} label={`${now}%`} style={{ height: "25px", marginTop: "-10px", backgroundColor : "white"  }} />
                    </div>
                    <div className='anxiousNow' style={{ marginBottom: "10px" }}>
                      <p>불안 😨</p>
                      <ProgressBar variant="warning" now={80} label={`${now}%`} style={{ height: "25px", marginTop: "-10px", backgroundColor : "white"  }} />
                    </div>

                  </div>
                </div>

                <div className='mt-3 text' style={{ width: "30%", textAlign:"center" }}>
                  <h5>오늘 {nickname}님의 하루는?</h5>
                  
                  <p>오늘 {nickname}님의 <br/> 
                  메인 감정은 <span style={{fontSize : "12pt"}}><b>{bestEmotionName}</b></span>입니다.<br />
                  HED가 감정에 어울리는 노래를 선곡했어요.<br /> 음악과 함께 하루를 마무리 해보세요.<br />
                  늘 {nickname}을 응원합니다.<br /> 내일 또 봐요.
                    
                  </p>
                </div>
                </div>
              </div>
              <Divider />
            </div>
            <Col>
              <div className='detailTitle'>
                <h4>추천 플레이리스트 🎶</h4>
              </div>
                {
                  shuffle(youtubeVideos).slice(0, 3).map((element) => {
                    return (
                      <Col><iframe src={`https://www.youtube.com/embed/${element.id.videoId}`} frameborder='0' allow='accelerometer; autoplay; clip-board-write; gyroscope; picture-in-picture' allowFullscreen></iframe></Col>
                    )
                  })
                }
            </Col>

          </Container>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>일기 삭제</Modal.Title>
          </Modal.Header>
          <Modal.Body>일기를 삭제하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="danger" onClick={deleteDiary}>
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </div >
    )
  }
}
export default DiaryDetail