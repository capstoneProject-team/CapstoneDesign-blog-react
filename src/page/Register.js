import React, { Component } from 'react';
import {Col, Form, Row} from "react-bootstrap";

class JoinForm extends Component {

  state = {
      name: '',
      email : '',
      firstPassword: '',
      lastPassword: '',
      checkPassword: '',
      location: ''
  };

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value,
      });
      if (e.target.name !== 'name') {
          setTimeout(this.handleCheck, 100);
      }
  };
  //비밀번호 체크

    handleCheck = () => {
        const { firstPassword, lastPassword } = this.state;
        if (firstPassword.length < 1 || lastPassword.length < 1) {
            this.setState({
                checkPassword: '비밀번호 입력',
            });
        } else if (firstPassword === lastPassword) {
            this.setState({
                checkPassword: '비밀번호가 일치합니다',
            });
        } else {
            this.setState({
                checkPassword: '비밀번호가 일치하지 않습니다',
            });
        }
    };

    render() {
        const { name, email, firstPassword, lastPassword, checkPassword, location } = this.state;
        return (
            <div>
                <form className="joinForm">
                    <Form.Group as={Row} className="mb-3" controlId="formName">
                        <Form.Label>이름</Form.Label>
                        <Col sm>
                            <input name="name" onChange={this.handleChange} value={name} placeholder="이름 " />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formID">
                        <Form.Label>이메일</Form.Label>
                        <Col sm>
                            <input name="email" onChange={this.handleChange} value={email} placeholder="이메일 " />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Col sm>
                            <input name="firstPassword" onChange={this.handleChange} value={firstPassword} placeholder="비밀번호"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Col sm>
                            <input name="lastPassword" onChange={this.handleChange} value={lastPassword} placeholder="비밀번호 확인"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label>장소</Form.Label>
                        <Col sm>
                            <Form.Select name='location' onChange={this.handleChange} value={location} placeholder="위치">
                                <option>서울</option>
                                <option>경기도</option>
                                <option>강원도</option>
                                <option>충청북도</option>
                                <option>충청남도</option>
                                <option>경상북도</option>
                                <option>경상남도</option>
                                <option>전라북도</option>
                                <option>전라남도</option>
                                <option>제주도</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                </form>

                <div className="showText">
                    <span>이름 : {name} </span><br />
                    <span>이메일 : {email}</span><br />
                    <span>비밀번호 : {firstPassword}</span><br />
                    <span>비밀번호확인 : {lastPassword}</span><br />
                    <span>비밀번호 일치 확인 : {checkPassword}</span><br/>
                    <span>위치 : {location}</span><br />
                </div>
            </div>
        );
    }
}

export default JoinForm;
