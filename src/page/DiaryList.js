import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import PostCard from '../component/PostCard';
import jwt_decode from "jwt-decode";
import Axios from "axios";
import getStorageItem from '../utils/useLocalStorage';
import editIcon from '../image/editicon.png'


const DiaryList = ({ setNavVisible }) => {
  const [page, setPage] = useState(1);

  const [pageList, setPageList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageCnt, setPageCnt] = useState([]);
  let jwt = localStorage.getItem('jwtToken');
  jwt = jwt.substring(1, jwt.length - 1)
  const { user_id } = jwt_decode(jwt);

  const handlePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
    const pageData = async () => {
      const response = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post/?page=${page}&author_id=${user_id}`);
      console.log(response)
      setPageList(response.data.results); 
      setTotalPage(parseInt((response.data.count) / 5) + 1); 
    }
    pageData();
  }, [page])

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    setPageCnt(pages);
  }, [totalPage])

  // handlePage(1);
  console.log(pageList)
  console.log(pageCnt)

  //더미 데이터
  // const detail = {
  //   'title': "일기test",
  //   'content': "예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기 예시 데이터 미리보기",
  //   'mainEmotion': 'sad',
  //   'created_at': "2020-11-24",
  //   'photo': "#"
  // }
  return ( 
    <div>
      <br />
      <Link to="/diary-create">
          <img src={editIcon} style={{filter: "drop-shadow(1.5px 1.5px 1.5px #000)", color : "#4A93FF" ,width:'80px', height:'80px', position: 'fixed', top: '87%', left: '77%', zIndex : '2' }}/></Link>
      <Container style={{ paddingLeft: '8%', paddingRight: '8%', paddingBottom: '3%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ paddingLeft: '20px' }}>TOTAL : {pageList.length}</p>

        </div>
        <br />
        
        {pageList.map(detail => (<PostCard detail={detail}/>))}
        {/* <PostCard detail={detail} />
        <PostCard detail={detail} />
        <PostCard detail={detail} />
        <PostCard detail={detail} />
        <PostCard detail={detail} /> */}


        <br />
        <br />

        <div class='pagination'>
          <Pagination size="sm">
            <Pagination.First />
            <Pagination.Prev />
            {pageCnt.map(x => (<Pagination.Item onClick={()=> handlePage(x)} >{x}</Pagination.Item>))}          
            {/* <Pagination.Item>1</Pagination.Item> */}
            <Pagination.Next />
            <Pagination.Last />
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Pagination>
        </div>


      </Container>
    </div>


  )
}

export default DiaryList