import React from 'react'
import {Form, Button} from "react-bootstrap";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import {Formik} from "formik";
import * as Yup from "yup";

const Register = (props) => {
  
  const submit = async (values) => {
    console.log(values);
    const {email, password, username,location,question1,question2} = values;
    await Axios.post('/api/auth/signup', {email, password, username,location,question1,question2})
    .then(response =>{
      alert("회원가입에 성공하였습니다! 반갑습니다 " + username + "님 :)")
        // <Alert variant="success">
        //   <Alert.Heading>회원가입을 환영합니다!</Alert.Heading>
        //   <p>
        //     "Haru Emotion Diary" 에 성공적으로 가입되었습니다!
        //     감사합니다 :) 
        //   </p>
        //   <hr />
        //   <p className="mb-0">
        //     회원탈퇴는 마이페이지에서 가능합니다!
        //   </p>
        // </Alert>
    })
    .catch(response => {
      alert("회원가입에 실패하였습니다! 다시 시도해주세요 :(");
      // <Alert variant="danger">
      //     <Alert.Heading>회원가입에 실패하였습니다!</Alert.Heading>
      //     <p>
      //       입력사항을 다시 한번 확인해주세요!
      //       감사합니다 :)
      //     </p>
      //     <hr />
      //     <p className="mb-0">
      //       문제가 지속될 시 능력자 "이찬희"를 불러주세요!
      //     </p>
      //   </Alert>
    });
  }
  return (
    <Formik
      initialValues={{ email: '', password: '', password2: '', username: '', location: '', question1: '', question2: ''}}
      onSubmit={submit}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("이메일 형식으로 입력하세요 :(")
          .required("필수 입력 사항입니다 :("),
        password: Yup.string()
          .required("필수 입력 사항입니다 :(")
          .min(6, "6자이상 입력하세요 :("),
        password2: Yup.string()
          .oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다 :(")
          .required("필수 입력 사항입니다 :("),
        username: Yup.string()
          .required("필수 입력 사항입니다 :("),
        location: Yup.string()
          .required("필수 선택 사항입니다 :("),
        question1: Yup.string()
        .required("필수 입력 사항입니다 :("),
        question2: Yup.string()
        .required("필수 입력 사항입니다 :(")
      })}>
      {
        ({values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting }) => (<Form onSubmit={handleSubmit}>

          <br />

          <Form.Group controlId="formGroupName">
            <Form.Label>사용자명</Form.Label>
            <Form.Control type="text" name="username" placeholder="사용하고자 하는 이름을 입력하세요"
                          value={values.username}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.username && !errors.username}
                          isInvalid={touched.username && errors.username ? true : false} />
            { touched.username && !errors.username && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback> }
            { touched.username && errors.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback> }
          </Form.Group>

          <br />

          <Form.Group controlId="email">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control name="email" placeholder="이메일 주소를 입력하세요"
                          value={values.email}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email ? true : false} />
            { touched.email && !errors.email && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback> }
            { touched.email && errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> }
          </Form.Group>

          <br />

          <Form.Group controlId="formGroupPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" name="password" placeholder="비밀번호를 입력하세요"
                          value={values.password}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && errors.password ? true : false} />
            { touched.password && !errors.password && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback> }
            { touched.password && errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> }
          </Form.Group>

          <br />

          <Form.Group controlId="formGroupPassword2">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control type="password" name="password2" placeholder="비밀번호를 재입력해주세요"
                          value={values.password2}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.password2 && !errors.password2}
                          isInvalid={touched.password2 && errors.password2 ? true : false} />
            { touched.password2 && !errors.password2 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback> }
            { touched.password2 && errors.password2 && <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback> }
          </Form.Group>

        <br />

          <Form.Group controlId="location">
            <Form.Label>주소</Form.Label>
            <Form.Select name='location'
                          value={values.location}
                          onChange={handleChange} onBlur={handleBlur}
                          isValid={touched.location && !errors.location}
                          isInvalid={touched.location && errors.location ? true : false}>
                                <option>지역을 선택해 주세요.</option>
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
            { touched.location && !errors.location && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback> }
            { touched.location && errors.location && <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback> }
          </Form.Group>

          <br />

          <Form.Group controlId="formGroupQuestion1">
            <Form.Label>가장 좋아하는 색깔은?</Form.Label>
            <Form.Control type="text" name="question1"
                          value={values.question1}
                          onChange={handleChange} onBlur={handleBlur}/>
            <Form.Text className="text-muted">
                    ex) 검정색
                  </Form.Text>
          </Form.Group>

          <br />

          <Form.Group controlId="formGroupQuestion2">
            <Form.Label>가장 좋아하는 음식은?</Form.Label>
            <Form.Control type="text" name="question2"
                          value={values.question2}
                          onChange={handleChange} onBlur={handleBlur}/>
                          <Form.Text className="text-muted">
                    ex) 떡볶이
                  </Form.Text>
          </Form.Group>

          <br />

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>)
      }
    </Formik>
  );
}

export default Register;