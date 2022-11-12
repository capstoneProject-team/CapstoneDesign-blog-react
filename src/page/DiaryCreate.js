import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";

//datepicker 불러오기
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

//editer 불러오기
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//부트스트랩
import { Container, Form, Row, Col } from 'react-bootstrap';

//antd
import { UploadOutlined } from '@ant-design/icons';
import { Space, Upload, notification } from 'antd';
import Axios from 'axios';

//etc
import {useNavigate} from 'react-router-dom';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { getJwtAtStorage } from '../utils/useLocalStorage';

//date format
import moment from 'moment';

const DiaryCreate = ({setNavVisible}) => {
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

  const onSubmit =async (event) => {
    event.preventDefault();
    console.log(created_at,diaryContent);

    let {title, content} = diaryContent;
    const formData = new FormData();
    formData.append('created_at', moment(created_at).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', selectFile);
    console.log(selectFile);
    try {
      await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}post/create/`, formData, { headers: {Authorization: `Bearer ${getJwtAtStorage()}`}});
      notification.open({
        message:"저장 완료!",
        description:"일기를 성공적으로 저장하였습니다.",
        icon:<SmileOutlined/>
      }); 
      console.log('success')
      navigate('/diary-list')
    }
    catch(e){
      console.log(e)
      if(e.response){
        notification.open({
          message:"로그인/회원가입이 되어있는지 확인해주세요.",
          description:"로그인 후 일기를 써보세요.",
          icon:<FrownOutlined/>
        })};
    }
  }


  //파일 선택 확인 
  const fileSelectedHandler = (event) => {
    setSelectFile(event.target.files[0]);
  }
  
  //파일 업로드
  // const fileUploadHandler = () => {
   
   
  //   console.log(selectFile)
  
  //   try {
  //     Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}post/create/`, formData,
  //     {
  //       header : {}
  //     });//업로드 파일에 관련된 Url 작성 필요
  //     }
  //   catch {
  //     console.log("실패");
  //   }
  // }
  


  return (
    <div>
      <Container>
        <Col>
          <Row className="mt-3"> <h2>일기 작성</h2></Row>

          <Row>
            <Col lg={9}><DatePicker selected={created_at} onChange={(date) => setDate_time(date)} /></Col>
            {/* <DatePicker defaultValue={moment({startDate}, dateFormat)} format={dateFormat} /> */}
          
          </Row>

          <Row>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="diaryCreateTitle">
                <Form.Control name='title' type="text" placeholder="제목" onChange={getValue} />
              </Form.Group>

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

              <input type="file" onChange={fileSelectedHandler} />

              <div className='mt-3'>
                {/* <Link to="/diary-detail"><Button type="submit" variant="info">저장</Button></Link> */}
                <Button type="submit" variant="info">저장</Button>
                <Link to="/diary-list"><Button variant="info">취소</Button></Link>
              </div>
            </Form>
          </Row>
        </Col>

      </Container>
    </div>

  )
}

export default DiaryCreate