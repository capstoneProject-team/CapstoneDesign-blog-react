import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";

const MainPrologue = () => {

    //back에서 불러올 데이터
    let diaryPrologueDateData = ['2022-10-25', '2022-10-23'] //다이어리 작성 날짜
    let diaryPrologueTitleData = ['title2', 'title3'] //다이어리 작성 날짜
    let diaryPrologueContentData = ['content2', 'content3'] //다이어리 작성 날짜
    
    //프롤로그 관련
    const [visiblePrologueDefault, setVisiblePrologueDefault] = useState(false);
    const [visiblePrologue1, setVisiblePrologue1] = useState(false);
    const [visiblePrologue2, setVisiblePrologue2] = useState(false);
    const [visiblePrologue3, setVisiblePrologue3] = useState(false);
    const setPrologue = () => {
        switch (diaryPrologueTitleData.length) {
            case 1:
                setVisiblePrologueDefault(false);
                setVisiblePrologue1(true);
                break;
            case 2:
                setVisiblePrologueDefault(false);
                setVisiblePrologue1(true);
                setVisiblePrologue2(true);
                break;
            case 3:
                setVisiblePrologueDefault(false);
                setVisiblePrologue1(true);
                setVisiblePrologue2(true);
                setVisiblePrologue3(true);
                break;
            default:
                setVisiblePrologueDefault(true);
                break;
        }
    }
    useEffect(() => {
        setPrologue();
    }, [])
    return (
        <Col>
            <h3>Prologue✨</h3>
            <Row className='box'>
                {visiblePrologueDefault &&
                    <Col className='text-center'>
                        <p>일기를 작성해주세요</p>
                        <Link to="/diary-create"><Button>일기작성하러가기</Button></Link>
                    </Col>}
                {visiblePrologue1 && <Col><Link to="/diary-detail">
                    <h5>{diaryPrologueTitleData[0]}</h5>
                    <p>{diaryPrologueContentData[0]}</p>
                    <p>{diaryPrologueDateData[0]}</p>
                </Link></Col>}
                {visiblePrologue2 && <Col><Link to="/diary-detail">
                    <h5>{diaryPrologueTitleData[1]}</h5>
                    <p>{diaryPrologueContentData[1]}</p>
                    <p>{diaryPrologueDateData[1]}</p>
                </Link></Col>}
                {visiblePrologue3 && <Col><Link to="/diary-detail">
                    <h5>{diaryPrologueTitleData[2]}</h5>
                    <p>{diaryPrologueContentData[2]}</p>
                    <p>{diaryPrologueDateData[2]}</p>
                </Link></Col>}
            </Row>
        </Col>
    )
}

export default MainPrologue