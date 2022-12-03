import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container, Form, Button } from 'react-bootstrap';
import { DeleteOutlined } from '@ant-design/icons';
import { notification, DatePicker, Input } from 'antd';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import "../static/CSS/DiaryCreate.css";
import moment from 'moment';


const DiaryCreate = ({ setNavVisible }) => {
  setNavVisible(true);
  //다이어리 날짜  
  const [created_at, setDate_time] = useState(new Date());
  const [diaryContent, setDiaryContent] = useState({
    title: '',
    content: ''
  })
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

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

    let { title, content } = diaryContent;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('created_at', moment(created_at).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('keyword', keyword);
    if (selectFile != null) {
      formData.append('photo', selectFile);
    }

    try {
      await Axios.post(`http://3.36.254.187:8000/post/create/`, formData, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } });
      notification.open({
        message: "저장 완료!",
        description: "일기를 성공적으로 저장하였습니다.",
        placement: 'bottomeRight',
        icon: <SmileOutlined />

      });
      navigate('/diary-list')
    }
    catch (e) {
      if (e.response) {
        console.log(e.response)
        notification.open({
          message: "일기를 저장하지 못했습니다.",
          placement: 'bottomeRight',
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
    setSelectFile("");

  }


  return (
    <div>
      <div className="containerCreate">
        <div>
          <div className="mt-3">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="diaryCreateTitle">
                <Input id="titleInput" size="large" bordered={false} name='title'
                  type="text" placeholder="제목" onChange={getValue} />
              </Form.Group>
              <hr id="hrReduceTop" />
              <CKEditor
                editor={ClassicEditor}
                config={{
                  removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "TableToolbar", "BlockQuote"],
                  placeholder: "내용을 입력하세요."
                }}

                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDiaryContent({
                    ...diaryContent,
                    content: data
                  })
                }}
              />

              <div className="mt-4">
                <h4>날짜 선택</h4>
                <p className='explain' >날짜를 선택해주세요. 밀린 일기도 마음껏 쓸 수 있습니다.</p>
                <DatePicker className='datepickerSize' onChange={(date) => setDate_time(date)} />
              </div>

              <div className="mt-5">
                <h4>오늘의 키워드</h4>
                <p className='explain'>오늘 하루를 나타내는 키워드를 적어주세요.</p>
                <Input id='keywordSize' name='keyword' type="text" placeholder="ex) 짝사랑"
                  onChange={(event) => setKeyword(event.target.value)} />
              </div>

              <div className="mt-5">
                <div>
                  <h4>이미지 업로드</h4>
                  <p className='explain'>대표 이미지 1장 업로드해주세요. jpg/png/gif 파일만 가능합니다.</p>
                  <Form.Control id="fileWidth" type="file" onChange={fileSelectedHandler} />

                  <br />
                  {imageSrc && <div className='preview'>
                    <div><img src={imageSrc} id="previewImg" alt="지원하지 않는 파일 형식의 이미지" /></div>
                    <div><DeleteOutlined onClick={deleteImg} id="deleteIcon"/></div>
                    
                  </div>}
                </div>
              </div>

              <div className='mt-5'>
                <Button type="submit" id="saveButton">저장</Button>
                <Link to="/diary-list"><Button variant="secondary" id="cancleButton">취소</Button></Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DiaryCreate