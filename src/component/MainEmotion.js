import React, { useState, useEffect } from 'react'

//메인 감정 이모티콘 보여주는 녀석

const MainEmotion = (detail) => {

    //best emotion 관련 UseState
    const [bestEmotion, setBestEmotion] = useState("");
    const [bestEmotionEmoticon, setBestEmotionEmoticon] = useState("🔎");
    const [bestEmotionResult, setBestEmotionResult] = useState("");
    const [bestEmotionName, setBestEmotionName] = useState("");

    console.log(detail.happy);

    const calResult = detail.happy + detail.sad + detail.angry + detail.hurt + detail.anxious + detail.statrled;


    const emotionList = [
        { emotion: "happy", emoticon: "😄", result: ((detail.happy / calResult) * 100).toFixed(1), emotionName: "기쁨" },
        { emotion: "sad", emoticon: "😭", result: ((detail.sad / calResult) * 100).toFixed(1), emotionName: "슬픔" },
        { emotion: "angry", emoticon: "🤬", result: ((detail.angry / calResult) * 100).toFixed(1), emotionName: "분노" },
        { emotion: "hurt", emoticon: "🤕", result: ((detail.hurt / calResult) * 100).toFixed(1), emotionName: "상처" },
        { emotion: "anxious", emoticon: "😨", result: ((detail.anxious / calResult) * 100).toFixed(1), emotionName: "불안" },
        { emotion: "statrled", emoticon: "😳", result: ((detail.statrled / calResult) * 100).toFixed(1), emotionName: "당황" },
    ]
    console.log(emotionList[0])
    const emotionResultList = (emotionList) => {
        let emotionResult = emotionList.sort(function (a, b) {
            return b.result - a.result; //내림차순 
        })

        setBestEmotion(emotionResult[0].emotion);
        setBestEmotionResult(emotionResult[0].result);
        setBestEmotionEmoticon(emotionResult[0].emoticon);
        setBestEmotionName(emotionResult[0].emotionName);
    }


    useEffect(() => {
        emotionResultList(emotionList);
        
    },[calResult])


    return (
        <div>
            <h4>{bestEmotionEmoticon}</h4>
        </div>
    )
}

export default MainEmotion