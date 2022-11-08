import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";

const MainTrend = () => {
    let diaryDateData = ['', 'x', '2022-10-25', 'x', '2022-10-23', '2022-10-22', '2022-10-21'] //다이어리 작성 날짜
    let diaryEmotionData = ['', 'x', 'happy', 'x', 'sad', 'angry', 'sad', 'happy'] //다이어리 작성 날짜
    let diaryEmotionStaticData = ['', 'x', '40%', 'x', '80%', '45%', '50%']

    let now = new Date();
    let newDay = new Date();
    const dateFormatter = (newDay, now) => {
        let year = newDay.getFullYear();
        let month = newDay.getMonth() + 1;
        let date = newDay.getDate();

        if (now) {
            let todayDate = now.getDate();
            if (date != todayDate) {
                if (month == 0) {
                    year -= 1;
                    month = (month + 11) % 12;
                    date = new Date(year, month, 0).getDate(); //해당 달의 마지막 날짜를 반환
                }
            }
            month = ("0" + month).slice(-2);
            date = ("0" + date).slice(-2);

        }
        return year + "-" + month + "-" + date;
    }
    let newDayArray = [];
    for (var i = 0; i < 7; i++) {
        newDay.setDate(now.getDate() - i);
        let diaryOfweek = dateFormatter(newDay);
        newDayArray.push(diaryOfweek);
    }

    return (
        <div>
            <Col>
                <h3>Trend📈</h3>
                <Col className='box'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>감정</th>
                                <th>퍼센트</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{newDayArray[0]}</td>
                                <td>{diaryEmotionData[0]}</td>
                                <td>{diaryEmotionStaticData[0]}</td>
                            </tr>
                            <tr>
                                <td>{newDayArray[1]}</td>
                                <td>{diaryEmotionData[1]}</td>
                                <td>{diaryEmotionStaticData[1]}</td>
                            </tr>
                            <tr>
                                <td>{newDayArray[2]}</td>
                                <td>{diaryEmotionData[2]}</td>
                                <td>{diaryEmotionStaticData[2]}</td>
                            </tr>
                            <tr>
                                <td>{newDayArray[3]}</td>
                                <td>{diaryEmotionData[3]}</td>
                                <td>{diaryEmotionStaticData[3]}</td>
                            </tr>
                            <tr>
                                <td>{newDayArray[4]}</td>
                                <td>{diaryEmotionData[4]}</td>
                                <td>{diaryEmotionStaticData[4]}</td>
                            </tr>
                            <tr>
                                <td>{newDayArray[5]}</td>
                                <td>{diaryEmotionData[5]}</td>
                                <td>{diaryEmotionStaticData[5]}</td>
                            </tr>
                            <tr>
                                <td>{newDayArray[6]}</td>
                                <td>{diaryEmotionData[6]}</td>
                                <td>{diaryEmotionStaticData[6]}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Col>
        </div>
    )
}

export default MainTrend