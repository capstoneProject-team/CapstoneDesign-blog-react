import "../static/CSS/Introduce.css";
import React from 'react'
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Col, Row, Button, Typography} from 'antd';
import { Image } from 'antd';
import introduce_1 from '../image/introduce_1.jpg';
import introduce_2 from '../image/introduce_2.jpg';
import introduce_3 from '../image/introduce_3.jpg';
import introduce_4 from '../image/introduce_4.jpg';
import introduce_5 from '../image/introduce_5.jpg';
import introduce_6 from '../image/introduce_6.jpg';
import introduce_7 from '../image/introduce_7.jpg';
import introduce_8 from '../image/introduce_8.jpg';





const Introduce = ({setNavVisible, setAuthentication}) => {
  const {Title} = Typography;
  setNavVisible(true);
  setAuthentication(false);

  return (
    <div>

​      <Container id='Containter'>
​        <Row id="Center">
​          <Col id="Center" span={12}>

              <h2>오늘 하루 어떠셨나요?</h2>
              <h3>내 이야기를 기록해보세요.<br/>오늘 나의 감정을 분석해줍니다 :)</h3>
              <pre>HED를 통해 나를 자세히 알아보세요!</pre>

​              <Link to="/login"><Button variant="info" type='primary' id='Button'>Start</Button></Link>
​          </Col>
​          <Col span={12}>
​          <Image  preview={false} src={introduce_4} id='Big'/>
​          </Col>
​        </Row>
<br/><br/><br/>
​        <Row align='middle' justify='center'><Col id="Center"><Title level={1}>"HED와 함께 소중한 하루를 마무리해보세요"</Title><br/><br/></Col></Row>
​        <Row id="Center">
​          <Col id="Center" span={8}><Image preview={false} src={introduce_2} id='Small'/><pre>일기내용을 통한 감정분석</pre></Col>
​          <Col className='text-center' span={8}><Image preview={false}  src={introduce_3} id='Small'/><pre>감정분석 결과를 통한 음악 추천</pre></Col>
​          <Col className='text-center' span={8}><Image preview={false}  src={introduce_1} id='Small'/><pre>일기내용을 통한 감정분석</pre></Col>
​          </Row>

​        <Row id='Center'>
​          <Col className='text-center' span={12}><Title level={3}>HED는 특별한 경험을 선사하는 일기장입니다</Title><Title level={5}>인공지능을 통해 일기가 가진 생각과 고민을 이해하고,<br/>더 나아가 노래를 통해 공감하고 소통을 합니다.  </Title></Col>
​          <Col span={12}><Image  preview={false} src={introduce_5} id='Big'/></Col>
​        </Row>
​        <Row id='Center'>
​          <Col span={12}><Image  preview={false} src={introduce_6} id='Small'/></Col>
​          <Col span={12} id='Center'><Title level={3}>내 삶의 순간을 기록하고 저장</Title>
          <br/><Title level={5}>소중했던 오늘 하루를 기록으로 남기고 싶나요?<br/>HED는 당신의 추억과 기억을 저장해주는 동반자입니다.</Title></Col>
​        </Row>
​        <Row  id='Center'>
​          <Col span={12} id='Center'><Title level={3}>감정분석을 통한 나의 컨디션 진단</Title><Title level={5}>오늘 기분이 어땠는지, 지금 기분이 어떤지 알고 싶나요?<br/>HED는 감정 분석을 통해 일기 속 감정들을 알려줍니다.</Title></Col>
​          <Col span={12}><Image  preview={false} src={introduce_7} id='Small'/></Col>
​        </Row>
​        <Row id='Center'>
​          <Col span={12}><Image  preview={false} src={introduce_8} id='Small'/></Col>
​          <Col span={12} id='Center'><Title level={3}>내 하루에 어울리는 음악 추천</Title><Title level={5}>고단했던 하루를 음악으로 마무리하고 싶나요?<br/>HED는 일기를 기반으로 감정에 맞는 음악 추천을 통해 당신의 하루를 위로해줍니다.</Title></Col>
​        </Row>
​        <Row id="Center_padding2">
​          <Col/>
​          <Col id="Center"><Title level={1}>"Haru Emotion Diary"로<br/>오직 나에게만 집중해보세요</Title></Col>
​          <Col/>
​        </Row>
​        <Row id="Center_padding">
​          <Col id="Center">
​          <Link to="/login"><Button variant="info" type='primary' id='Button'>오늘 하루 진단받기</Button></Link>
​          </Col>
​        </Row>
​        </Container >


​    </div>
  )
}

export default Introduce