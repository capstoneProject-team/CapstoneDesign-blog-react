import { React, useState, useEffect } from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import { Container, Button, Table, Dropdown, SplitButton } from 'react-bootstrap';
import PostCard from '../component/PostCard';
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { getJwtAtStorage } from '../utils/useLocalStorage'
import editIcon from '../image/editicon.png'
import {Input, Select, Divider, Row, Col, Typography} from 'antd';

const DiaryList = ({setNavVisible,page,setPage,searchInput,setSearchInput}) => {
  const { Option } = Select;
  const { Title} = Typography;
  const [visible, setVisible] = useState(false);
  const [pageForSearch,setPageForSearch] = useState(1);
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

  // const handleSetPageForSearch = (x) => {
  //   setPageForSearch(x);
  //   onSearch(searchInput);
  // }

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
          const response = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post?page=${page}&author_id=${user_id}&${type}=${searchInput}`, {headers: {Authorization: `Bearer ${getJwtAtStorage()}`}});
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
      
  },[page,searchInput])

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
      <Link to="/diary-create">
          <img src={editIcon} style={{filter: "drop-shadow(1.5px 1.5px 1.5px #000)", color : "#4A93FF" ,width:'50px', height:'50px', position: 'fixed', top: '85%', left: '85%', zIndex : '2' }}/></Link>
        <Container>
        <Row >
          <Col ><h5>{postCnt}개의 글</h5></Col>
          <Divider />

        </Row>
        </Container><br/>
        
        {pageList.map(detail => (<PostCard detail={detail}/>))}
  
        <br />

        {visible && <div style={{justifyContent:"center"}}>
          <Container>
            <Row style={{padding:"100px 0px 100px 0px"}}>
              <Col  span={24} align='middle' justify='center'>
                <Title disabled strong>
                  작성하신 일기가 없습니다 🥲
                </Title>
              </Col>
            </Row>
          </Container> 
        </div>}

        <br />

        <Container id="">
          <Row style={{padding:"0px 0px 100px 0px"}}>
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
        </Container>

        <div class='pagination' style={{padding:"0px 0px 200px 0px"}}>
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
        {/* <Select>
        <Search addonBefore="제목" placeholder="input search text" onSearch={onSearch} enterButton />
        <Search addonBefore="내용" placeholder="input search text" onSearch={onSearch} enterButton />
        <Search addonBefore="날짜" placeholder="input search text" onSearch={onSearch} enterButton />
        </Select> */}


        
    </div>
  )
}

export default DiaryList