import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route, Link, useParams } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

//editer 불러오기
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//부트스트랩
import { Container, Form, Row, Col } from 'react-bootstrap';

//antd
import { SmileOutlined, FrownOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Upload, notification, DatePicker, Input, Spin } from 'antd';
import Axios from 'axios';
import dayjs from 'dayjs';
// import DatePicker from "react-datepicker";

//etc
import { useNavigate } from 'react-router-dom';

import { getJwtAtStorage } from '../utils/useLocalStorage';

//date format
import moment from 'moment';


const DiaryCreate = ({ setNavVisible }) => {
  //네비게이션
  setNavVisible(true);

  //저장소
  const { post_id } = useParams();
  const [created_at, setCreate_at] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState([]);
  const dateFormat = 'YYYY/MM/DD';
  const [visiable, setVisiable] = useState(false);
  const [disiable, setDisiable] = useState(true);


  const changeTitle =(event)=>{
    setTitle(event.target.value);
    console.log(title);
  }

  //다이어리 보여지기 관련
  const response = async () => {
    const res = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
    const data = res.data;
    setCreate_at(data.created_at);
    setTitle(data.title);
    setContent(data.content);
    if (data.photo == null) {
      setVisiable(false);
      setPhoto(data.photo);
    } else {
      setPhoto(data.photo);
      setVisiable(true);
    }
    setLoadingSpinner(true);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("수정한 것들", created_at, title, content, "포토", selectFile);

    const formData = new FormData();
    formData.append('created_at', moment(created_at).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('title', title);
    formData.append('content', content);
    if (selectFile != null) {
      formData.append('photo', selectFile);
    }
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    try {
      await Axios.patch(`${process.env.REACT_APP_LOCAL_DJ_IP}post/update/${post_id}/`, formData, { headers: { Authorization: `Bearer ${getJwtAtStorage()}`}});
      notification.open({
        message: "수정 완료!",
        description: "일기를 성공적으로 수정하였습니다.",
        icon: <SmileOutlined />
      });
      console.log('success')
      navigate('/diary-list')
    }
    catch (e) {
      console.log(e)
      if (e.response) {
        notification.open({
          message: "로그인/회원가입이 되어있는지 확인해주세요.",
          description: "로그인 후 일기를 써보세요.",
          icon: <FrownOutlined />
        })
      };
    }
  }
  const [selectFile, setSelectFile] = useState(null);

  //파일 선택 확인 
  const fileSelectedHandler = (event) => {
    setSelectFile(event.target.files[0]);
    encodeFileToBase64(event.target.files[0]);
  }

  //이미지 미리보기
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      }
    })
  };
  const deleteImg = () => {
    setImageSrc('');
    setSelectFile(null);

  }
  const deleteBeforeImg = () => {
    setVisiable(false);
    setPhoto(null);
    setDisiable(false);
  }

  //다이어리 날짜  

  useEffect(() => {
    response();
  }, []);


  const navigate = useNavigate();


  if (loadingSpinner == false) {
    return (
      <div className='loadingSpinner'>
        <LoadingOutlined style={{ fontSize: 100, color: 'blue'}} spin />
      </div>
    )
  } else {
    return (
      <div>
        <Container style={{ paddingLeft: "8%", paddingRight: "8%" }}>
          <Col>
            <Row className="mt-3">
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="diaryCreateTitle">
                  <Input size="large" onChange={changeTitle} value={title} bordered={false} name='title' type="text" placeholder="제목" style={{ fontSize: "20pt" }} />
                  </Form.Group>
                <hr style={{ marginTop: "-10px" }} />
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  config={{
                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "TableToolbar", "BlockQuote"],
                    placeholder: "내용을 입력하세요."
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />

                <Row className="mt-4">
                  <h4>날짜 선택</h4>
                  <p className='explain' style={{ fontSize: "11pt", color: "grey" }}>날짜를 선택해주세요. 밀린 일기도 마음껏 쓸 수 있습니다.</p>
                  <Col lg={9}><DatePicker onChange={(date) => setCreate_at(new Date)} defaultValue={moment(created_at, dateFormat)} format={dateFormat} /></Col>

                </Row>
                <Row className="mt-5">
                  <Col lg={5}>
                    <h4>이미지 업로드</h4>
                    {visiable && <Row>
                      <Col><img src={photo} alt='image' style={{ width: 'auto', height: 'auto', maxWidth: "300px", maxHeight: "300px" }} /></Col>
                      <Col><DeleteOutlined onClick={deleteBeforeImg} style={{ color: 'red' }} /></Col>
                    </Row>}
                    <p className='explain' style={{ fontSize: "11pt", color: "grey" }}>대표 이미지 1장 업로드해주세요.</p>
                    <Form.Control type="file" onChange={fileSelectedHandler} disabled={disiable}/>
                    <br />
                    {imageSrc && <Row className='preview'>
                      <Col><img src={imageSrc} alt="preview-img" style={{ width: 'auto', height: 'auto', maxWidth: "300px", maxHeight: "300px" }} /></Col>
                      <Col><DeleteOutlined onClick={deleteImg} style={{ color: 'red' }} /></Col>
                    </Row>}
                  </Col>
                </Row>

                <div className='mt-5' style={{ float: "right" }}>
                  <Button type="submit" style={{ width: "90px", backgroundColor: '#4A93FF', border: 'none' }}>수정</Button>
                  <Link to="/diary-list"><Button variant="secondary" style={{ width: "90px", border: 'none' }}>취소</Button></Link>
                </div>
              </Form>
            </Row>
          </Col>
        </Container>
        <br /><br /><br />
      </div>

    )
  }
}

export default DiaryCreate