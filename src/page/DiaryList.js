import { React, useState, useEffect } from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import { Container, Row, Col, Button, Table, Dropdown, SplitButton } from 'react-bootstrap';
import PostCard from '../component/PostCard';
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { getJwtAtStorage } from '../utils/useLocalStorage'
const DiaryList = ({setNavVisible}) => {
  const [page, setPage] = useState(1);

  const [pageList, setPageList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageCnt, setPageCnt] = useState([]);
  const [postCnt, setPostCnt] = useState([]);
  let jwt = localStorage.getItem('jwtToken');
  jwt = jwt.substring(1, jwt.length - 1)
  const { user_id } = jwt_decode(jwt);

  const handlePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
      const pageData = async() => {
        const response = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post?page=${page}&author_id=${user_id}`, {headers: {Authorization: `Bearer ${getJwtAtStorage()}`}});
        setPageList(response.data.results);
        setPostCnt(response.data.results.length);
        setTotalPage(parseInt((response.data.count)/ 5)+1);
      }
      pageData();
  },[page])

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    setPageCnt(pages);
  }, [totalPage])

  // handlePage(1);

  return ( 
    <div>
        <br/><br/><br/>
        <Container>
        <Row >
          <Col ><h5>{postCnt}개의 글</h5></Col>
          <Col xs={6}></Col>
          <Col>
          <SplitButton
          key='Info'
          id={`dropdown-split-variants-'Info'`}
          variant={'Info'.toLowerCase()}
          title={'정렬조건'}
        >
          <Dropdown.Item eventKey="1">최신순</Dropdown.Item>
          <Dropdown.Item eventKey="2">오래된순</Dropdown.Item>
        </SplitButton></Col>
        </Row>
        </Container><br/>
        
        {pageList.map(detail => (<PostCard detail={detail}/>))}
  
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
    </div>
  )
}

export default DiaryList