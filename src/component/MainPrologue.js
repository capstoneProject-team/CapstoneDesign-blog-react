import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Card } from 'antd';
import no_image from '../static/image/no_image.jpg';
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
            <div className="card">
                    <Card 
                        bodyStyle={{ backgroundColor: '#E7EFFB' }}
                        
                        cover={
                            <img src={diaryPrologueContentPhoto} alt='image' id='cardImage' style={{width : "100%"}}/>}>
                        <Meta
                            title={diaryPrologueTitleData}
                            style={{height : "43px"}}
                        />
                    </Card>
                    <br />
</div>
        </Link>

    )
}

export default MainPrologue