import "../static/CSS/Introduce.css";
import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Col, Row, Typography } from 'antd';
import { Button } from 'react-bootstrap';
import { Image } from 'antd';
import introduce_1 from '../static/image/introduce_1.png';
import introduce_2 from '../static/image/introduce_2.png';
import introduce_3 from '../static/image/introduce_3.png';
import introduce_4 from '../static/image/introduce_4.png';
import introduce_5 from '../static/image/introduce_5.png';
import introduce_6 from '../static/image/introduce_6.png';
import introduce_7 from '../static/image/introduce_7.png';
import introduce_8 from '../static/image/introduce_8.png';
import AOS from "aos";
import "aos/dist/aos.css";


const Introduce = ({ setNavVisible, setAuthentication }) => {

  
  const { Title } = Typography;
  setNavVisible(true);
  setAuthentication(false);
  useEffect(() => {
    AOS.init();
  })

  return (
    <div>
      <Container id='Containter'>
      <br /><br />
        <div data-aos="fade-down" data-aos-duration="1500" className="mobileCenter">
            <div>
              <b><p className="bigTitle">오늘 하루 어떠셨나요?<br/></p></b>
              <b><p className="bigTitle" style={{marginTop : "30px"}}>내 이야기를 기록해보세요.<br />오늘 나의 감정을 분석해줍니다 :)</p></b>
              <p>HED를 통해 나를 자세히 알아보세요!</p>
              <div style={{marginTop : "70px"}}>
              <Link to="/login"><Button style={{width : "100px", height : "45px"}}id='Button1'>시작하기</Button></Link></div>
            </div>
            <div >
              <Image preview={false} src={introduce_4} id='Big' />
            </div>
         </div>


         <div data-aos="zoom-in" data-aos-duration="1700" style={{marginTop : "300px"}}>
        <Row align='middle' justify='center'><Col id="Center"><b><p className="bigTitle2">HED와 함께 소중한 하루를 마무리해보세요</p></b><br /><br /></Col></Row>
        </div>

        <br /><br /><br />

        <div data-aos="fade-down" data-aos-duration="1700">
        <Row id="Center">
          <Col id="Center" span={8}><Image preview={false} src={introduce_2} id='Small' /><p>매 순간 특별해지는 나의 일상</p></Col>
          <Col className='text-center' span={8}><Image preview={false} src={introduce_3} id='Small' /><p>일기내용을 통한 감정분석</p></Col>
          <Col className='text-center' span={8}><Image preview={false} src={introduce_1} id='Small' /><p>감정분석 결과를 통한 음악 추천</p></Col>
        </Row>
        </div>

        <br /><br /><br /> <br /><br />

        <div data-aos="fade-right" data-aos-duration="1700" data-aos-delay="400">
        <Row id='Center'>
          <Col className='text-center' span={12}><Title level={3}>HED는 특별한 경험을 선사하는 일기장입니다</Title>
          <p>인공지능을 통해 일기가 가진 생각과 고민을 이해하고,<br />더 나아가 노래를 통해 공감하고 소통을 합니다. </p></Col>
          <Col span={12}><Image preview={false} src={introduce_5} id='Small' /></Col>
        </Row>
        </div>

        <div data-aos="fade-left" data-aos-duration="1700" data-aos-delay="400">
        <Row id='Center'>
          <Col span={12}><Image preview={false} src={introduce_6} id='Small' /></Col>
          <Col span={12} id='Center'><Title level={3}>내 삶의 순간을 기록하고 저장</Title>
            <br /><p>소중했던 오늘 하루를 기록으로 남기고 싶나요?<br />HED는 당신의 추억과 기억을 저장해주는 동반자입니다.</p></Col>
        </Row>
        </div>

        <div data-aos="fade-right" data-aos-duration="1700" data-aos-delay="400">
        <Row id='Center'>
          <Col span={12} id='Center'><Title level={3}>감정분석을 통한 나의 컨디션 진단</Title><p>오늘 기분이 어땠는지, 지금 기분이 어떤지 알고 싶나요?<br />HED는 감정 분석을 통해 일기 속 감정들을 알려줍니다.</p></Col>
          <Col span={12}><Image preview={false} src={introduce_7} id='Small' /></Col>
        </Row>
        </div>

        <div data-aos="fade-left" data-aos-duration="1700" data-aos-delay="400">
        <Row id='Center'>
          <Col span={12}><Image preview={false} src={introduce_8} id='Small'/></Col>
          <Col span={12} id='Center'><Title level={3}>내 하루에 어울리는 음악 추천</Title><p>고단했던 하루를 음악으로 마무리하고 싶나요?<br />HED는 일기를 기반으로 감정에 맞는 음악 추천을 통해 당신의 하루를 위로해줍니다.</p></Col>
        </Row>
        </div>
        

        <div data-aos="zoom-out" data-aos-duration="1700" data-aos-delay="400">
        <Row id="Center_padding2">
          <Col />
          <Col id="Center"><b><p className="bigTitle2">Haru Emotion Diary로<br />오직 나에게만 집중해보세요</p></b></Col>
          <Col />
        </Row>
        <Row id="Center_padding">
          <br/><br/><br/><br/>
          <Col id="Center">
            <Link to="/login"><Button id='Button2' style={{width : "200px", height : "45px"}}>오늘 하루 진단받기</Button></Link>
          </Col>
        </Row>
        </div>
      </Container >


    </div>
  )
}

export default Introduce