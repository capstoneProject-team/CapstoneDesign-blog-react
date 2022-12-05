import { React, useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from "react-router-dom";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from 'axios';
import "../static/CSS/DiaryDetail.css";
import LoadingSpinner from '../component/LoadingSpinner';
import DiaryDetailContent from '../component/DiaryDetailContent.js';
import DiaryDetailResult from '../component/DiaryDetailResult.js';


const DiaryDetail = ({ setNavVisible }) => {
  setNavVisible(true);


  const [loadingSpinner, setLoadingSpinner] = useState(false);
  //작성글 관련 useState
  
  const { post_id } = useParams();
  const [detail, setDetail] = useState([]);


  const response = async () => {
    const res = await Axios.get(`http://3.36.254.187:8000/post/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
    const data = res.data;
    setDetail(data);
    setLoadingSpinner(true);
    
  }

 
  useEffect(() => {
    response();

  }, []);




  if (loadingSpinner == false) {
    return (
      <LoadingSpinner />
    )
  } else {
    return (
        <div className="containerDetail">
          {/* 제목 작성자, 토글 */}
          <DiaryDetailContent detail={detail}/>
          <DiaryDetailResult detail={detail}/>
         

      </div >
    )
  }
}
export default DiaryDetail