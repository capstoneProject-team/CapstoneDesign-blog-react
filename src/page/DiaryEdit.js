import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container, Form, Button } from 'react-bootstrap';
import { SmileOutlined, FrownOutlined, DeleteOutlined } from "@ant-design/icons";
import { notification, DatePicker, Input, Spin } from 'antd';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getJwtAtStorage } from '../utils/useLocalStorage';
import moment from 'moment';
import "../static/CSS/DiaryEdit.css";
import LoadingSpinner from '../component/LoadingSpinner';


const DiaryEdit = ({ setNavVisible }) => {
  //네비게이션
  setNavVisible(true);

  const navigate = useNavigate();

  //저장소
  const { post_id } = useParams();
  const [created_at, setCreate_at] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const dateFormat = 'YYYY/MM/DD';
  const [disiable, setDisiable] = useState(false);
  const [selectFile, setSelectFile] = useState("");
  const [editCreated_at, setEditCreate_at] = useState("");
  const [keyword, setKeyword] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
    console.log(title);
  }

  //다이어리 보여지기 관련
  const response = async () => {
    const res = await Axios.get(`http://3.36.254.187:8000/post/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
    const data = res.data;
    setCreate_at(data.created_at);
    setTitle(data.title);
    setContent(data.content);
    setKeyword(data.keyword);

    // 사진이 있는 경우
    if (data.photo != null) {
      setPhoto(data.photo);
      await convertURLtoFile(data.photo).then(async (res) => {
        setPhotoFile(res);
      })
    }
    setLoadingSpinner(true);
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (editCreated_at == "") {
      formData.append('created_at', moment(created_at).format('YYYY-MM-DD HH:mm:ss'));

    } else {
      formData.append('created_at', moment(editCreated_at).format('YYYY-MM-DD HH:mm:ss'));

    }

    formData.append('title', title);
    formData.append('content', content);
    if (selectFile == "") {
      formData.append('photo', photoFile);
    } else {
      formData.append('photo', selectFile);
    }
    formData.append('keyword', keyword);

    try {
      await Axios.patch(`http://3.36.254.187:8000/post/update/${post_id}/`, formData, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } });
      notification.open({
        message: "수정 완료!",
        description: "일기를 성공적으로 수정하였습니다.",
        placement: 'bottomeRight',
        icon: <SmileOutlined />
      });
      console.log('success')
      navigate('/diary-list')
    }
    catch (e) {
      console.log(e)
      if (e.response) {
        notification.open({
          message: "일기 수정에 실패했습니다.",
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

  const convertURLtoFile = async (url) => {
    const response = await fetch(
      `${url}`,
    );
    const data = await response.blob();
    const filename = `uploadImg.${url.split('.').reverse()[0]}`; 
    const metadata = { type: `image/${url.split('.').reverse()[0]}` };
    console.log(response);
    return new File([data], filename, metadata);
  };

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

  }
  const deleteBeforeImg = async (event) => {
    setPhoto("");
    setPhotoFile("");
    setDisiable(false);

  }

  useEffect(() => {
    response();
  }, []);


  if (loadingSpinner == false) {
    return (
      <LoadingSpinner/>
    )
  } else {
    return (
        <div className="containerEdit">
          <div>
            <div className="mt-3">
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="diaryCreateTitle">
                  <Input size="large" id="titleInput" onChange={changeTitle}
                    value={title} bordered={false} name='title' type="text" placeholder="제목" />
                </Form.Group>
                <hr id="hrReduceTopEdit" />
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

                <div className="mt-4">
                  <h4>날짜 선택</h4>
                  <p className='explain'>날짜를 선택해주세요. 밀린 일기도 마음껏 쓸 수 있습니다.</p>
                  <DatePicker className='datepickerSize' onChange={(date) => setEditCreate_at(date)}
                    defaultValue={moment(created_at, dateFormat)} format={dateFormat} />

                </div>
                <div className="mt-5">
                  <h4>오늘의 키워드</h4>
                  <p className='explain'>오늘 하루를 나타내는 키워드를 적어주세요.</p>
                  <Input id='keywordSize' name='keyword' type="text" placeholder="ex) 짝사랑"
                    value={keyword} onChange={(event) => setKeyword(event.target.value)} />
                </div>

                <div className="mt-5">
                  <div>
                    <h4>이미지 업로드</h4>
                    <p className='explain'>대표 이미지 1장 업로드해주세요. jpg/png/gif 파일만 가능합니다.</p>
                    {photo && <div>
                      <Form.Control id="fileWidth1" type="file" onChange={fileSelectedHandler} disabled={true} />
                      <div className='preview'>
                      <div><br/><img src={photo} alt='지원하지 않는 파일 형식의 이미지' id="photo-Img" /></div>
                      <div><br/><DeleteOutlined onClick={deleteBeforeImg} id="deleteIcon"/></div></div>
                    </div>}

                    {!photo && <Form.Control id="fileWidth2"type="file" onChange={fileSelectedHandler} disabled={disiable} />}
                    <br />
                    {imageSrc && <div className='preview'>
                      <div><img src={imageSrc} alt="지원하지 않는 파일 형식의 이미지" id="imageSrc-Img"  /></div>
                      <div><DeleteOutlined onClick={deleteImg} id="deleteIcon" /></div>
                    </div>}
                  </div>
                </div>

                <Button type="submit" id="saveButton">수정</Button>
                <Link to="/diary-list"><Button id="cancleButton" variant="secondary">취소</Button></Link>
              </Form>
            </div>
          </div>
        </div>

    )
  }
}

export default DiaryEdit