import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import { Card, Row, Col } from 'antd';
import no_image from '../image/no_image.jpg';
import "../static/CSS/MainPrologue.css";

const MainPrologue = ({ detail }) => {
    // jwt token
    let jwt = localStorage.getItem('jwtToken');
    jwt = jwt.substring(1, jwt.length - 1)
    const { user_id } = jwt_decode(jwt);

    //back에서 불러올 데이터
    const diaryPrologueDateData = new Date(detail.created_at).toISOString().split('T')[0]; //다이어리 작성 날짜
    const diaryPrologueTitleData = detail.title; //다이어리 제목
    const diaryPrologueContentData = detail.content.replace(/(<([^>]+)>)/ig, "").replace(/&nbsp;/g, "").substr(0,100);//다이어리 내용
    const [diaryPrologueContentPhoto, setDiaryPrologueContentPhoto] = useState(null);

    const { Meta } = Card;

    useEffect(() => {
        if (detail.photo === null) {
            setDiaryPrologueContentPhoto(no_image);
        } else {
            setDiaryPrologueContentPhoto(detail.photo);
        }
    }, [])

    return (
        <Link to={`/diary-detail/${detail.id}`} id='link'>
            <Row>
                <Col>
                    <Card
                        bodyStyle={{ backgroundColor: '#E7EFFB', borderBlockColor: '#E7EFFB' }}
                        id='cardStyle'
                        cover={
                            <img src={diaryPrologueContentPhoto} alt='image' id='cardImage'/>}>
                        <Meta
                            title={diaryPrologueTitleData}
                            description={diaryPrologueContentData}
                            style={{height : "100px"}}
                        />
                    </Card>
                    <br />
                </Col>
            </Row>
        </Link>

    )
}

export default MainPrologue