import { React, useState, useEffect, useLayoutEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Container, Col, Button, Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from 'axios';
import noimage from '../image/noimage.png';
import { Divider, notification } from 'antd';
import { MoreOutlined, SmileOutlined, FrownOutlined, LoadingOutlined } from '@ant-design/icons';
import youtubeAPI from '../youtubeAPI.json';
import moment from 'moment';
import "../static/CSS/DiaryDetail.css";

const DiaryDetailContent = ({detail}) => {

    const { post_id } = useParams();
    const token = getJwtAtStorage();
    const { nickname } = jwt_decode(token);
    
    //본문
    const created_at = detail.created_at;
    const title = detail.title;
    const content = detail.content;
    const keyword = detail.keyword;
    const photo = detail.photo;


    //수정 기능
    const navigate = useNavigate();

    const navigateEditDiary = () => {
      navigate(`/diary-edit/${post_id}`)
    }
  
    //삭제 기능
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
            placement: 'bottomeRight'
          });
          navigate('/diary-list')
        } catch (e) {
          console.log(e)
          notification.open({
            message: "일기 삭제 실패, 다시 시도해 주세요.",
            icon: <FrownOutlined style={{ color: "#108ee9" }} />,
            placement: 'bottomeRight'
          });
    
        }
      }
    
  return (
    <div>
        <div className='detailTitle'>
            <div className='detailTitle'>
              <h2>{title}</h2>
              <br />
            </div>
            <div className='writerToggle'>
              <div className='contentInfo'>
                <p>
                  {nickname} &nbsp; 
                  <span style={{ color: 'grey' }}>
                    {moment(created_at).format('YYYY년 MM월 DD일')}</span> </p>
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
            <Divider />
          </div>

          
          <div className='detailContent'>
            <div className="content">
              <div><p dangerouslySetInnerHTML={{ __html: content }}></p></div>
              <div>{photo && <div>
                  <img src={photo} alt='image' id="contentImg"/>
                </div>}</div>
            </div>
          </div>

          <div className="detailKeyword">
          {keyword && <div>
              <Divider />
              <p>오늘의 키워드 : {keyword}</p>
            </div>}
            <Divider />  
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
    </div>
  )
}

export default DiaryDetailContent