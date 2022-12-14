import { React } from 'react'
import { ProgressBar } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import { Divider } from 'antd';
import "../static/CSS/DiaryDetail.css";
import DiaryDetailYoutube from './DiaryDetailYoutube';
import { useMediaQuery } from 'react-responsive';


const DiaryDetailResult = ({ detail }) => {
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 600 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 601 })
    return isNotMobile ? children : null
  }

  const token = getJwtAtStorage();
  const { nickname } = jwt_decode(token);

  const keyword = detail.keyword;
  const calResult = detail.happy + detail.sad + detail.angry + detail.hurt + detail.anxious + detail.startled;

  const happy = ((detail.happy / calResult) * 100).toFixed(1);
  const sad = ((detail.sad / calResult) * 100).toFixed(1)
  const angry = ((detail.angry / calResult) * 100).toFixed(1)
  const hurt = ((detail.hurt / calResult) * 100).toFixed(1)
  const anxious = ((detail.anxious / calResult) * 100).toFixed(1)
  const startled = ((detail.startled / calResult) * 100).toFixed(1)

  const emotionList = [
    { emotion: "happy", emoticon: "π", result: happy, emotionName: "κΈ°μ¨μ΄", emotionKeyword: "κΈ°λΆ μ’μ" },
    { emotion: "sad", emoticon: "π­", result: sad, emotionName: "μ¬νμ΄", emotionKeyword: "μ°μΈν" },
    { emotion: "angry", emoticon: "π€¬", result: angry, emotionName: "λΆλΈκ°", emotionKeyword: "λΉ‘μΉλ" },
    { emotion: "hurt", emoticon: "π€", result: hurt, emotionName: "μμ²κ°", emotionKeyword: "μ§μΉ  λ" },
    { emotion: "anxious", emoticon: "π¨", result: anxious, emotionName: "λΆμμ΄", emotionKeyword: "λΆμν" },
    { emotion: "statrled", emoticon: "π³", result: startled, emotionName: "λΉν©μ΄", emotionKeyword: "μ΄μ΄μλ" },
  ]

  const emotionSort = emotionList.sort(function (a, b) {
    return b.result - a.result; //λ΄λ¦Όμ°¨μ 
  });

  const bestEmotion = emotionSort[0].emotion;
  const bestEmotionResult = emotionSort[0].result;
  const bestEmotionEmoticon = emotionSort[0].emoticon;
  const bestEmotionName = emotionSort[0].emotionName;
  const bestEmotionKeyword = emotionSort[0].emotionKeyword;

  //best emotion κ΄λ ¨ UseState


  const emotionBackgroundColor = (bestEmotion) => {
    if (bestEmotion == "happy") {
      const happyStyle = {
        backgroundColor: "#FFFFDD",
        borderRadius: "20px",
        padding: "2%"
      }
      return happyStyle;
    }

    else if (bestEmotion == "statrled") {
      const statrledStyle = {
        backgroundColor: "#DDF2F8",
        borderRadius: "20px",
        padding: "2%"
      }
      return statrledStyle;
    }

    else if (bestEmotion == "angry") {
      const angryStyle = {
        backgroundColor: "#F6C8C0",
        borderRadius: "20px",
        padding: "2%"
      }
      return angryStyle;
    }

    else if (bestEmotion == "anxious") {
      const anxiousStyle = {
        backgroundColor: "#F2FAEC",
        borderRadius: "20px",
        padding: "2%"
      }
      return anxiousStyle;
    }
    else if (bestEmotion == "hurt") {
      const hurtStyle = {
        backgroundColor: "#F5EEFE",
        borderRadius: "20px",
        padding: "2%"
      }
      return hurtStyle;
    }
    else if (bestEmotion == "sad") {
      const sadStyle = {
        backgroundColor: "#DDE2F8",
        borderRadius: "20px",
        padding: "2%"
      }
      return sadStyle;
    }

  }

  if (calResult == 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h4>μ£μ‘ν©λλ€. μΌκΈ°μμ κ°μ μ΄ μ λκ»΄μ§μ§ μμ΅λλ€π­</h4>
      </div>
    )
  }

  return (
    <div>
      <div className='detailResult'>
        <div className="diaryResult">
          <div className='diaryResultTitle'>
            <h4>μΌκΈ°κ°μ λΆμκ²°κ³Ό π</h4>
          </div>
          <Default>
            <div className="mt-3">
              {/* <div className="resultContent" style={emotionBackgroundColor(bestEmotion)}> */}
              <div className="resultContent" style={emotionBackgroundColor(bestEmotion)}>
                <div className="contentLeft">
                  <div>
                    <div id="bestEmotionEmoticon">{bestEmotionEmoticon}</div>
                  </div>
                  <div className="emotionResult">
                    <div className='emotionTitle'>
                      <p>κΈ°μ¨ π</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={happy} label={`${happy}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>μ¬ν π­</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={sad} label={`${sad}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>λΆλΈ π€¬</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={angry} label={`${angry}%`} />
                    </div>
                  </div>
                  <div className="emotionResult">
                    <div className='emotionTitle'>
                      <p>λΉν© π³</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={startled} label={`${startled}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>μμ² π€</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={hurt} label={`${hurt}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>λΆμ π¨</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={anxious} label={`${anxious}%`} />
                    </div>

                  </div>
                </div>

                <div className='resultText'>
                  <br />
                  <p>μ€λ {nickname}λμ <br />
                    μΌκΈ°μμ <span style={{ fontSize: "12pt" }}><b>{bestEmotionName}</b></span> λκ»΄μ§λλ€.<br />
                    <br />HEDκ° μΆμ²ν΄ μ€ λΈλλ₯Ό λ£κ³  <br />νλ£¨λ₯Ό λ§λ¬΄λ¦¬ν΄λ³΄μΈμ!<br />λ μμν©λλ€ :-)
                  </p>
                </div>
              </div>
            </div>

          </Default>

          <Mobile>
            <div className="mt-3">
              {/* <div className="resultContent" style={emotionBackgroundColor(bestEmotion)}> */}
              <div style={emotionBackgroundColor(bestEmotion)}>
                <div>
                  <div>
                    <div style={{textAlign : "center", fontSize : "40pt"}}>{bestEmotionEmoticon}</div>
                  </div>
                  <div>
                    <div className='emotionTitle'>
                      <p>κΈ°μ¨ π</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={happy} label={`${happy}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>μ¬ν π­</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={sad} label={`${sad}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>λΆλΈ π€¬</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={angry} label={`${angry}%`} />
                    </div>
                  </div>
                  <div >
                    <div className='emotionTitle'>
                      <p>λΉν© π³</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={startled} label={`${startled}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>μμ² π€</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={hurt} label={`${hurt}%`} />
                    </div>
                    <div className='emotionTitle'>
                      <p>λΆμ π¨</p>
                      <ProgressBar id="progressBar" variant="warning"
                        now={anxious} label={`${anxious}%`} />
                    </div>

                  </div>
                </div>

                <div style={{textAlign : "center"}}>
                  <br />
                  <p>μ€λ {nickname}λμ <br />
                    μΌκΈ°μμ <span style={{ fontSize: "12pt" }}><b>{bestEmotionName}</b></span> λκ»΄μ§λλ€.<br />
                    <br />HEDκ° μΆμ²ν΄ μ€ λΈλλ₯Ό λ£κ³  <br />νλ£¨λ₯Ό λ§λ¬΄λ¦¬ν΄λ³΄μΈμ!<br />λ μμν©λλ€ :-)
                  </p>
                </div>
              </div>
            </div>

          </Mobile>
        </div>
        <Divider />
      </div>
      <DiaryDetailYoutube bestEmotionName={bestEmotionKeyword} keyword={keyword} />

    </div>
  )
}

export default DiaryDetailResult