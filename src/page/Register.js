import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import logo_detail from '../image/logo_detail.png';
import { Steps } from "antd";
import "../static/CSS/Register.css";


const Register = ({ setNavVisible, props }) => {
  setNavVisible(false);

  // For Steps
  let description1 = ["회원가입을 위한", <br />, "기본정보 작성"]
  let description2 = ["음악 추천을 위한", <br />, "질문사항"]


  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(false);


  const { Step } = Steps;
  const [current, setCurrent] = useState(0)

  const navigate = useNavigate();

  const submit = async (values) => {
    console.log(values);
    let { nickname, username, password, hint1, hint2, location, question1, question2, question3 } = values;

    try {
      await Axios.post(`http://3.36.254.187:8000/user/signup/`,
        { nickname, username, password, hint1, hint2, location, question1, question2, question3 })

      notification.open({
        message: "회원가입 성공",
        description: "로그인 페이지로 이동합니다.",
        icon: <SmileOutlined />
      });
      navigate('/login')
    }

    catch (e) {
      if (e.response) {
        notification.open({
          message: "회원가입 실패",
          description: "아이디/비밀번호를 확인해주세요.",
          icon: <FrownOutlined />
        })
      }
      ;
    };
  }
  return (
    <div className='div1'>
      {/* 이미지 */}
      <div className='div2'>
        <br />
        <Link to="/"><img src={logo_detail} id='logo' alt='해당 이미지를 찾을 수 없습니다.' /></Link></div>

      <Formik
        initialValues={{
          nickname: '', username: '', password: '', password2: '', hint1: '', hint2: '',
          location: '', question1: '', question2: '', question3: ''
        }}
        // nickname : 사용자 이름, username : 이메일
        onSubmit={submit}
        validationSchema={Yup.object().shape({
          nickname: Yup.string()
            .required("필수 입력 사항입니다!"),
          username: Yup.string()
            .email("이메일 형식으로 입력하세요!")
            .required("필수 입력 사항입니다!"),
          password: Yup.string()
            .required("필수 입력 사항입니다!")
            .min(3, "3자이상 입력하세요!"),
          password2: Yup.string()
            .oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다!")
            .required("필수 입력 사항입니다!"),
          hint1: Yup.string()
            .required("필수 입력 사항입니다!"),
          hint2: Yup.string()
            .required("필수 입력 사항입니다!"),
          location: Yup.string()
            .required("필수 선택 사항입니다!"),
          question1: Yup.string()
            .required("필수 선택 사항입니다!"),
          question2: Yup.string()
            .required("필수 선택 사항입니다!"),
          question3: Yup.string()
            .required("필수 선택 사항입니다!")
        })}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (<Form onSubmit={handleSubmit}>
          {/* 전체를 덮는 div */}
          <div>
            {/* Step */}
            <div id='div3'>
              <Steps current={current} labelPlacement='vertical' id='step'>
                <Step title="기본정보" description={description1} onClick={() => { setVisible1(false); setVisible2(true); setCurrent(1); }}></Step>
                <Step title="음악취향조사" description={description2} onClick={(c) => { setVisible1(true); setVisible2(false); setCurrent(0); }}></Step>
              </Steps>
            </div>
            {/* 기본정보 용도 */}
            {visible1 && <div id='Info'>
              <Form.Group controlId="formNickname">
                <Form.Label>사용자명</Form.Label>
                <Form.Control type="text" name="nickname" placeholder="사용하고자 하는 이름을 입력하세요"
                  value={values.nickname}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.nickname && !errors.nickname}
                  isInvalid={touched.nickname && errors.nickname ? true : false} />
                {touched.nickname && !errors.nickname && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.nickname && errors.nickname && <Form.Control.Feedback type="invalid">{errors.nickname}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="username">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control name="username" placeholder="이메일 주소를 입력하세요"
                  value={values.username}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.nickname && !errors.nickname}
                  isInvalid={touched.nickname && errors.nickname ? true : false} />
                {touched.nickname && !errors.nickname && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.nickname && errors.nickname && <Form.Control.Feedback type="invalid">{errors.nickname}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="formGroupPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" name="password" placeholder="비밀번호를 입력하세요"
                  value={values.password}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password ? true : false} />
                {touched.password && !errors.password && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.password && errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="formGroupPassword2">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control type="password" name="password2" placeholder="비밀번호를 재입력해주세요"
                  value={values.password2}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.password2 && !errors.password2}
                  isInvalid={touched.password2 && errors.password2 ? true : false} />
                {touched.password2 && !errors.password2 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.password2 && errors.password2 && <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="formGroupHit1">
                <Form.Label>가장 좋아하는 색깔은?</Form.Label>
                <Form.Control type="text" name="hint1" placeholder="비밀번호 찾기시에 활용됩니다"
                  value={values.hint1}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.hint1 && !errors.hint1}
                  isInvalid={touched.hint1 && errors.hint1 ? true : false} />
                {touched.hint1 && !errors.hint1 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.hint1 && errors.hint1 && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="formGroupHint2">
                <Form.Label>가장 좋아하는 음식은?</Form.Label>
                <Form.Control type="text" name="hint2" placeholder="비밀번호 찾기시에 활용됩니다"
                  value={values.hint2}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.hint2 && !errors.hint2}
                  isInvalid={touched.hint2 && errors.hint2 ? true : false} />
                {touched.hint2 && !errors.hint2 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.hint2 && errors.hint2 && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
              </Form.Group>
              <br />

              <Form.Group controlId="location">
                <Form.Label>거주지</Form.Label>
                <Form.Select name='location'
                  value={values.location}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.location && !errors.location}
                  isInvalid={touched.location && errors.location ? true : false}>
                  <option>지역을 선택해 주세요.</option>
                  <option value={"서울"}>서울</option>
                  <option value={"경기도"}>경기도</option>
                  <option value={"강원도"}>강원도</option>
                  <option value={"충청북도"}>충청북도</option>
                  <option value={"충청남도"}>충청남도</option>
                  <option value={"경상북도"}>경상북도</option>
                  <option value={"경상남도"}>경상남도</option>
                  <option value={"전라북도"}>전라북도</option>
                  <option value={"전라남도"}>전라남도</option>
                  <option value={"제주도"}>제주도</option>
                </Form.Select>
                {touched.location && !errors.location && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.location && errors.location && <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Button id='nextButton' onClick={() => { setVisible1(false); setVisible2(true); setCurrent(1); }}>다음</Button>
            </div>}
            {/* 설문조사 */}
            {visible2 && <div id='Info'>
              <Form.Group controlId="question1">
                <Form.Label>질문1. 평상시에 음악을 얼마나 들으시나요?</Form.Label>
                <Form.Select name='question1'
                  value={values.question1}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.question1 && !errors.question1}
                  isInvalid={touched.question1 && errors.question1 ? true : false}>
                  <option>답변을 선택해 주세요.</option>
                  <option value={"틈날 때 마다"}>(1) 틈날 때 마다</option>
                  <option value={"여유가 될 때"}>(2) 여유가 될 때</option>
                  <option value={"생각나는 노래가 있을 때"}>(3) 생각나는 노래가 있을 때</option>
                  <option value={"자주 듣지 않음"}>(4) 자주 듣지 않음</option>

                </Form.Select>
                {touched.question1 && !errors.question1 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.question1 && errors.question1 && <Form.Control.Feedback type="invalid">{errors.question1}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="question2">
                <Form.Label>질문2. 언제 음악을 주로 듣는 편이신가요?</Form.Label>
                <Form.Select name='question2'
                  value={values.question2}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.question2 && !errors.question2}
                  isInvalid={touched.question2 && errors.question2 ? true : false}>
                  <option>답변을 선택해 주세요.</option>
                  <option value={"따로 시간을 내서"}>(1) 따로 시간을 내서</option>
                  <option value={"이동 중에"}>(2) 이동 중에</option>
                  <option value={"감정적일 때"}>(3) 감정적일 때</option>
                  <option value={"공부할 때"}>(4) 공부할 때</option>
                  <option value={"심심할 때"}>(5) 심심할 때</option>
                  <option value={"운동할 때"}>(6) 운동할 때</option>

                </Form.Select>
                {touched.question2 && !errors.question2 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.question2 && errors.question2 && <Form.Control.Feedback type="invalid">{errors.question2}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Form.Group controlId="question3">
                <Form.Label>질문3. 좋아하는 음악 장르가 어떻게 되나요?</Form.Label>
                <Form.Select name='question3'
                  value={values.question3}
                  onChange={handleChange} onBlur={handleBlur}
                  isValid={touched.question3 && !errors.question3}
                  isInvalid={touched.question3 && errors.question3 ? true : false}>
                  <option>답변을 선택해 주세요.</option>
                  <option value={"클래식"}>(1) 클래식</option>
                  <option value={"재즈"}>(2) 재즈</option>
                  <option value={"CCM"}>(3) CCM</option>
                  <option value={"팝"}>(4) 팝</option>
                  <option value={"발라드"}>(5) 발라드</option>
                  <option value={"블루스"}>(6) 블루스</option>
                  <option value={"힙합"}>(7) 힙합</option>
                  <option value={"컨트리"}>(8) 컨트리</option>
                  <option value={"포크"}>(9) 포크</option>
                  <option value={"레게"}>(10) 레게</option>
                  <option value={"디스코"}>(11) 디스코</option>
                  <option value={"록"}>(12) 록</option>
                  <option value={"일렉트로닉"}>(13) 일렉트로닉</option>
                  <option value={"K-POP"}>(14) K-POP</option>
                  <option value={"트로트"}>(15) 트로트</option>
                  <option value={"R&B"}>(16) R&B</option>
                </Form.Select>
                {touched.question3 && !errors.question3 && <Form.Control.Feedback type="valid">확인되었습니다 :)</Form.Control.Feedback>}
                {touched.question3 && errors.question3 && <Form.Control.Feedback type="invalid">{errors.question3}</Form.Control.Feedback>}
              </Form.Group>
              <br />
              <Button id='previousButton' variant="secondary" onClick={() => { setVisible1(true); setVisible2(false); setCurrent(0); }}>이전</Button>
              <Button id='nextButton' variant="primary" type="submit" disabled={isSubmitting}>회원가입</Button>
            </div>}
          </div>
        </Form>)}
      </Formik>
    </div>
  );
}

export default Register;