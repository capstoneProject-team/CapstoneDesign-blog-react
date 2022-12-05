import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo_detail from '../static/image/logo_detail.png';


const Navigation = ({ isAuthenticated, setAuthentication, setPage, setSearchInput }) => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/login')
  }

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthentication(false);
    window.localStorage.clear();
    navigate('/')
  }
  const mypage = () => {
    navigate('/mypage');
  }
  const diarylist = () => {
    setSearchInput("");
    setPage(1);
    navigate('/diary-list')
  }

  return (
    <Navbar id="sticky-nav" className="fixed-top shadow-sm" bg="light" collapseOnSelect expand="lg">
      <Container>
        <Link to={'/main'}><Navbar.Brand href="#">
          <img
            alt=""
            src={logo_detail}
            width="120"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

          {isAuthenticated == false ?
            <Nav><Nav.Link onClick={login} href="#">Sign in</Nav.Link></Nav> :

            <Nav><Nav.Link onClick={diarylist} href="#">전체 일기장</Nav.Link>
              <Nav.Link onClick={mypage} href="#" >마이페이지</Nav.Link>
              <Nav.Link onClick={logout} href="#">로그아웃</Nav.Link>
            </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation