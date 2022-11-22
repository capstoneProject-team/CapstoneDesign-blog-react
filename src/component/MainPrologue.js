import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from "axios";
import {Divider, Space, Typography} from 'antd';

const MainPrologue = ({detail}) => {

    const { Title, Text, Paragraph} = Typography;

    // jwt token
    let jwt = localStorage.getItem('jwtToken');
    jwt = jwt.substring(1, jwt.length - 1)
    const { user_id } = jwt_decode(jwt);

    // 전체 정보가 담긴 list
    const [post, setPost] = useState([]);

    //back에서 불러올 데이터
    const diaryPrologueDateData = new Date(detail.created_at).toISOString().split('T')[0]; //다이어리 작성 날짜
    const diaryPrologueTitleData = detail.title; //다이어리 제목
    const diaryPrologueContentData = detail.content.replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/g,"");//다이어리 내용

    
    //프롤로그 관련
    // const [visiblePrologueDefault, setVisiblePrologueDefault] = useState(false);
    // const [visiblePrologue1, setVisiblePrologue1] = useState(false);
    // const [visiblePrologue2, setVisiblePrologue2] = useState(false);
    // const [visiblePrologue3, setVisiblePrologue3] = useState(false);
    // const setPrologue = () => {
    //     switch (diaryPrologueTitleData.length) {
    //         case 1:
    //             setVisiblePrologueDefault(false);
    //             setVisiblePrologue1(true);
    //             break;
    //         case 2:
    //             setVisiblePrologueDefault(false);
    //             setVisiblePrologue1(true);
    //             setVisiblePrologue2(true);
    //             break;
    //         case 3:
    //             setVisiblePrologueDefault(false);
    //             setVisiblePrologue1(true);
    //             setVisiblePrologue2(true);
    //             setVisiblePrologue3(true);
    //             break;
    //         default:
    //             setVisiblePrologueDefault(true);
    //             break;
    //     }
    // }



        // const getData = async() => {
        //     const res = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post?page=1&author_id=${user_id}`, {headers: {Authorization: `Bearer ${getJwtAtStorage()}`}});
        //     setPost(res.data.results);
        //     setDiaryPrologueTitleData([post[0].title,post[1].title,post[2].title]);
        //     setDiaryPrologueDateData([post[0].created_at,post[1].created_at,post[2].created_at]);
        //     setDiaryPrologueContentData([post[0].content,post[1].content,post[2].content]);
        // }

        // useEffect(() => {
        //     setPrologue();
        //     getData();
        // });

    return (
        <Col>
            
            <Row className='boxPrologue'>
            <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
                <Container>
                    <Row>
                        <Col>{diaryPrologueTitleData}</Col>
                        <Col>{diaryPrologueContentData}</Col>
                        <Col>{diaryPrologueDateData}</Col>
                    </Row>
                </Container>
                </Link>
                {/* {visiblePrologueDefault &&
                    <Col className='text-center'>
                        <p>일기를 작성해주세요</p>
                        <Link to="/diary-create"><Button>일기작성하러가기</Button></Link>
                    </Col>} */}
                {/* {visiblePrologue1 && <Row><Link to="/diary-detail" style={{ textDecoration: 'none' }}>
                    <Title level={3}>{diaryPrologueTitleData[0]} </Title>
                    <Paragraph level={5} ellipsis={true}>{diaryPrologueContentData[0].replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/g,"")}</Paragraph>
                    <Text ellipsis={true} type={'secondary'}>{new Date(diaryPrologueDateData[0]).toISOString().split('T')[0]}</Text>
                </Link></Row>}
                <Divider/>
                {visiblePrologue2 && <Row><Link to="/diary-detail" style={{ textDecoration: 'none' }}>
                <Title level={3}>{diaryPrologueTitleData[1]} </Title>
                    <Paragraph level={5} ellipsis={true}>{diaryPrologueContentData[1].replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/g,"")}</Paragraph>
                    <Text ellipsis={true} type={'secondary'}>{new Date(diaryPrologueDateData[1]).toISOString().split('T')[0]}</Text>
                </Link></Row>}
                <Divider/>
                {visiblePrologue3 && <Row><Link to="/diary-detail" style={{ textDecoration: 'none' }}>
                <Title level={3}>{diaryPrologueTitleData[2]} </Title>
                    <Paragraph level={5} ellipsis={true}>{diaryPrologueContentData[2].replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/g,"")}</Paragraph>
                    <Text ellipsis={true} type={'secondary'}>{new Date(diaryPrologueDateData[2]).toISOString().split('T')[0]}</Text>
                </Link></Row>} */}
            </Row>
        </Col>
    )
}

export default MainPrologue