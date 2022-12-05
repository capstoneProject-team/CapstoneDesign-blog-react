import { React} from 'react'
import { ProgressBar } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import { Divider } from 'antd';
import "../static/CSS/DiaryDetail.css";
import DiaryDetailYoutube from './DiaryDetailYoutube';



const DiaryDetailResult = ({ detail }) => {

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
        { emotion: "happy", emoticon: "😄", result: happy, emotionName: "기쁨", emotionKeyword : "기분 좋은" },
        { emotion: "sad", emoticon: "😭", result: sad, emotionName: "슬픔" , emotionKeyword : "우울한" },
        { emotion: "angry", emoticon: "🤬", result: angry, emotionName: "분노" , emotionKeyword : "빡치는" },
        { emotion: "hurt", emoticon: "🤕", result: hurt, emotionName: "상처" , emotionKeyword : "지칠 때"  },
        { emotion: "anxious", emoticon: "😨", result: anxious, emotionName: "불안", emotionKeyword : "불안한" },
        { emotion: "statrled", emoticon: "😳", result: startled, emotionName: "당황", emotionKeyword : "어이없는" },
    ]

    const emotionSort = emotionList.sort(function (a, b) {
        return b.result - a.result; //내림차순 
    });

    const bestEmotion = emotionSort[0].emotion;
    const bestEmotionResult= emotionSort[0].result;
    const bestEmotionEmoticon = emotionSort[0].emoticon;
    const bestEmotionName = emotionSort[0].emotionName;
    const bestEmotionKeyword = emotionSort[0].emotionKeyword;

    //best emotion 관련 UseState

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

    return (
        <div>
            <div className='detailResult'>
                <div className="diaryResult">
                    <div className='diaryResultTitle'>
                        <h4>일기감정분석결과 📈</h4>
                    </div>

                    <div className="mt-3">
                        {/* <div className="resultContent" style={emotionBackgroundColor(bestEmotion)}> */}
                        <div className="resultContent" style={emotionBackgroundColor(bestEmotion)}>
                            <div className="contentLeft">
                                <div>
                                    <div id="bestEmotionEmoticon">{bestEmotionEmoticon}</div>
                                </div>
                                <div className="emotionResult">
                                    <div className='emotionTitle'>
                                        <p>기쁨 😄</p>
                                        <ProgressBar id="progressBar" variant="warning"
                                            now={happy} label={`${happy}%`} />
                                    </div>
                                    <div className='emotionTitle'>
                                        <p>슬픔 😭</p>
                                        <ProgressBar id="progressBar" variant="warning"
                                            now={sad} label={`${sad}%`} />
                                    </div>
                                    <div className='emotionTitle'>
                                        <p>분노 🤬</p>
                                        <ProgressBar id="progressBar" variant="warning"
                                            now={angry} label={`${angry}%`} />
                                    </div>
                                </div>
                                <div className="emotionResult">
                                    <div className='emotionTitle'>
                                        <p>당황 😳</p>
                                        <ProgressBar id="progressBar" variant="warning"
                                            now={startled} label={`${startled}%`} />
                                    </div>
                                    <div className='emotionTitle'>
                                        <p>상처 🤕</p>
                                        <ProgressBar id="progressBar" variant="warning"
                                            now={hurt} label={`${hurt}%`} />
                                    </div>
                                    <div className='emotionTitle'>
                                        <p>불안 😨</p>
                                        <ProgressBar id="progressBar" variant="warning"
                                            now={anxious} label={`${anxious}%`} />
                                    </div>

                                </div>
                            </div>

                            <div className='resultText'>
                                <br />
                                <p>오늘 {nickname}님의 <br />
                                    일기에서 <span style={{ fontSize: "12pt" }}><b>{bestEmotionName}</b></span>가 느껴집니다.<br />
                                    <br />HED가 추천해 준 노래를 듣고 <br />하루를 마무리해보세요!<br />늘 응원합니다 :-)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
            </div>
            <DiaryDetailYoutube bestEmotionName={bestEmotionKeyword} keyword={keyword} />

        </div>
    )
}

export default DiaryDetailResult