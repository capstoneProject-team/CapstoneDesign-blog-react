import React, {useState} from 'react'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FindPassword = () => {
  const [checkEmail, setCheckEmail] = useState('')
  const [answerQuestion1, setAnswerQuestion1] = useState('')
  const [answerQuestion2, setAnswerQuestion2] = useState('')
  const [newPassword, setNewPassword]= useState('')
  const [newPasswordConfirm, setNewPasswordConfirm]= useState('')

  const[visible, setVisible] = useState(false);
  
  
  const onSubmitFirst =(event)=>{
    event.preventDefault();
    console.log(answerQuestion1, answerQuestion2)
    
    //이메일 본인 인증 및 답변 맞게 했는지 확인 (ex)
    if (checkEmail==="jinjusr365@naver.com" && answerQuestion1 === "검정색" && answerQuestion2 ==="떡볶이"){
      setVisible(!visible)
      console.log('성공')

    }else{
      console.log('실패');
      alert("이메일 혹은 답변을 확인해주세요")

    }
  }

  const onSubmitSecond =(event)=>{
    event.preventDefault();
    console.log(newPassword, newPassword)
    
    //비밀번호 확인
    if (newPassword == newPasswordConfirm){
      alert("성공적으로 비밀번호를 변경하였습니다.")


    }else{
      console.log('실패');
      alert("새 비밀번호를 다시 확인해주세요")

    }
  }


  return (
    <div>
      <Container>
        <Col>
          <Row className="mt-3"><h2>비밀번호 찾기</h2>
            <p>*본인 확인을 위해 가입 이메일과 회원가입 시 입력했던, 힌트에 답변해주세요.</p></Row>
          <Col>
            <Row>
              <Form onSubmit={onSubmitFirst} >
              <Form.Group className="mb-3" controlId="checkEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" onChange={(event)=>setCheckEmail(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="question1">
                  <Form.Label>가장 좋아하는 색깔은?</Form.Label>
                  <Form.Control type="text" onChange={(event)=>setAnswerQuestion1(event.target.value)} />
                  <Form.Text className="text-muted">
                    ex) 검정색
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="question2">
                  <Form.Label>가장 좋아하는 음식은?</Form.Label>
                  <Form.Control type="text" onChange={(event)=>setAnswerQuestion2(event.target.value)}/>
                  <Form.Text className="text-muted">
                    ex) 떡볶이
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  확인
                </Button>
              </Form>
            </Row>
          </Col>
        

        {visible && <div>
          <Row className="mt-3">
            <hr />
            <h2>비밀번호 변경</h2>
            <p>새로운 비밀번호를 입력해주세요.</p>
          </Row>
          <Row>
            <Form onSubmit={onSubmitSecond}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="newPassword">
                  <Form.Label>새 비밀번호</Form.Label>
                  <Form.Control type="password" placeholder="새 비밀번호" onChange={(event)=>setNewPassword(event.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="newPasswordCheck">
                  <Form.Label>새 비밀번호 확인</Form.Label>
                  <Form.Control type="password" placeholder="새 비밀번호 확인" onChange={(event)=>setNewPasswordConfirm(event.target.value)} />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                비밀번호 변경하기
              </Button>

            </Form>
          </Row>
          </div>}
        </Col>
      </Container>

    </div>

  )
}

export default FindPassword