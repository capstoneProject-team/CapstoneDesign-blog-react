import { React, useState, useEffect } from 'react'
import {Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import { Container} from 'react-bootstrap';
import PostCard from '../component/PostCard';
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { getJwtAtStorage } from '../utils/useLocalStorage'
import editIcon from '../static/image/editicon.png'
import {Input, Select, Divider, Row, Col, Typography} from 'antd';
import "../static/CSS/DiaryList.css";

const DiaryList = ({page,setPage,searchInput,setSearchInput}) => {
  const { Option } = Select ;
  const { Title} = Typography;
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("title");
  const [pageList, setPageList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageCnt, setPageCnt] = useState([]);
  const [postCnt, setPostCnt] = useState(0);
  let jwt = localStorage.getItem('jwtToken');
  jwt = jwt.substring(1, jwt.length - 1)
  const { user_id } = jwt_decode(jwt);

  const handlePage = (page) => {
    setPage(page);
  }

  const noPost = (cnt) => {
    if(cnt === 0){
      setVisible(true);
    }else{
      setVisible(false);
    }
  }

    const onSearch = (search) => {
      console.log("검색어 : ",search)
      setPage(1);
      setSearchInput(search);
    }



    const handleChange =(value) => {
      setType(value);
    }


  useEffect(() => {
      const pageData = async() => {
          const response = await Axios.get(`http://3.36.254.187:8000/post?page=${page}&author_id=${user_id}&${type}=${searchInput}`, {headers: {Authorization: `Bearer ${getJwtAtStorage()}`}});
          setPageList(response.data.results);
          setPostCnt(response.data.count);
          noPost(response.data.count);
          if(response.data.count%7 === 0){
            setTotalPage(parseInt((response.data.count)/ 7));
          }else{
            setTotalPage(parseInt((response.data.count)/ 7)+1);
          }
    
      }
      pageData();
      
  },[page,searchInput,type])

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    setPageCnt(pages);
  }, [totalPage])

  // handlePage(1);

  return (
    <div id='divPadding'>
      <Link to="/diary-create">
          <img src={editIcon} id='create_icon'/></Link>
        <Container>
          <p id='counter'>{postCnt}개의 글</p>
          <Divider />
          {pageList.map(detail => (<PostCard detail={detail}/>))}
          
          {visible && <div style={{justifyContent:"center"}}>
            <Row id='ifnone'>
              <Col span={24} align='middle' justify='center'>
                <Title disabled strong>
                  작성하신 일기가 없습니다 🥲
                </Title>
              </Col>
            </Row>
        </div>}

          <Row>
            <Col span={24} align='middle' justify='center'>
            <br/>
              <Input.Group compact>
                <Select defaultValue="제목" onChange={handleChange}>
                  <Option value={"title"}>제목</Option>
                  <Option value={"content"}>내용</Option>
                  <Option value={"created_at"}>날짜</Option>
                </Select>
              <Input.Search style={{ width: '50%' }}  onSearch={onSearch} enterButton/>
              </Input.Group> 
              <br/>
            </Col>
          </Row>

          <div class='pagination' id='pagination'>
          <Pagination size="sm">
            <Pagination.First />
            <Pagination.Prev />
            {pageCnt.map(x => (<Pagination.Item onClick={()=> handlePage(x)} >{x}</Pagination.Item>))}        
            <Pagination.Next />
            <Pagination.Last />
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Pagination>
        </div>
        </Container>
        
        <br/>
        <br/>
        <br/>
    </div>
  )
}

export default DiaryList
