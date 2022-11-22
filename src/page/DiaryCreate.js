import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";

//datepicker 불러오기
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';

//editer 불러오기
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//부트스트랩
import { Container, Form, Row, Col } from 'react-bootstrap';

//antd
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Upload, notification, DatePicker, Input } from 'antd';
import Axios from 'axios';

//etc
import { useNavigate } from 'react-router-dom';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { getJwtAtStorage } from '../utils/useLocalStorage';

//date format
import moment from 'moment';

const DiaryCreate = ({ setNavVisible }) => {
  setNavVisible(true);
  //다이어리 날짜  
  const [created_at, setDate_time] = useState(new Date());

  //다이어리 title과 content
  const [diaryContent, setDiaryContent] = useState({
    title: '',
    content: ''
  })

  const navigate = useNavigate();

  //event가 생기면 값을 받아오는 것
  const getValue = (event) => {
    const { name, value } = event.target;
    setDiaryContent({
      ...diaryContent,
      [name]: value
    })
  }

  //파일 데이터 관련 코드
  const [selectFile, setSelectFile] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(created_at, diaryContent);

    let { title, content } = diaryContent;
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
      await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}post/create/`, formData, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } });
      notification.open({
        message: "저장 완료!",
        description: "일기를 성공적으로 저장하였습니다.",
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


  //파일 선택 확인 
  const fileSelectedHandler = (event) => {
    setSelectFile(event.target.files[0]);
    encodeFileToBase64(event.target.files[0]);
  }

  //이미지 미리보기
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = (fileBlob)=>{
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve)=>{
      reader.onload = ()=>{
        setImageSrc(reader.result);
        resolve();
      }
    })
  };
  const deleteImg =()=>{
    setImageSrc('');
    setSelectFile(null);

  }


  return (
    <div>
      <Container style={{ paddingLeft: "8%", paddingRight: "8%" }}>
        <Col>
          <Row className="mt-3">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="diaryCreateTitle">
                <Input size="large" bordered={false} name='title' type="text" placeholder="제목" onChange={getValue} style={{ fontSize: "20pt" }} />
              </Form.Group>
              <hr style={{ marginTop: "-10px" }} />
              <CKEditor
                editor={ClassicEditor}
                // config={{editorConfiguration,
                // placeholder: "내용을 입력하세요."}}
                config={{
                  removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "TableToolbar", "BlockQuote"],
                  placeholder: "내용을 입력하세요."
                }}

                onReady={editor => {
                  console.log('Editor is ready to use!', editor);

                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDiaryContent({
                    ...diaryContent,
                    content: data
                  })

                }}
                onBlur={(event, editor) => {
                  //   console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  //   console.log('Focus.', editor);
                }}
              />

              <Row className="mt-4">
                <h4>날짜 선택</h4>
                <p className='explain' style={{ fontSize: "11pt", color: "grey" }}>날짜를 선택해주세요. 밀린 일기도 마음껏 쓸 수 있습니다.</p>
                <Col lg={9}><DatePicker onChange={(date) => setDate_time(date)} /></Col>
              </Row>
              <Row className="mt-5">
                <Col lg={5}>
                  <h4>이미지 업로드</h4>
                  <p className='explain' style={{ fontSize: "11pt", color: "grey" }}>대표 이미지 1장 업로드해주세요. jpeg/jpg, png파일만 가능합니다.</p>
                  <Form.Control type="file" onChange={fileSelectedHandler}/>

                  <br/>
                  {imageSrc && <Row className='preview'>
                    <Col><img src={imageSrc} alt="preview-img" style={{ width:'auto', height : 'auto', maxWidth : "300px", maxHeight : "300px"}}/></Col>
                    <Col><DeleteOutlined onClick={deleteImg} style={{color : 'red'}}/></Col>
                  </Row>}
                </Col>
              </Row>

              <div className='mt-5' style={{ float: "right" }}>
                <Button type="submit" style={{ width: "90px", backgroundColor: '#4A93FF', border: 'none' }}>저장</Button>
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

export default DiaryCreate