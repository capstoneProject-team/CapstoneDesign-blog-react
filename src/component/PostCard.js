import React, { useEffect, useState } from 'react'
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';

const PostCard = ({detail}) => {
  //상세페이지로 넘어가기 
  const moveToDetail = () => {
    
  }

  const emotion = detail.mainEmotion;

  const[emotionIcon, setEmotionIcon] =  useState("")
    
  const textEmotionToIcon = (emotion) => {
    if (emotion == 'happy'){
      setEmotionIcon("😄")
    }
    if (emotion == 'sad'){
      setEmotionIcon("😭")
    }
    if (emotion == 'angry'){
      setEmotionIcon("🤬")
    }
    if (emotion == 'hurt'){
      setEmotionIcon("🤕")
    }
    if (emotion == 'anxious'){
      setEmotionIcon("😨")
    }
    if (emotion == 'statrled'){
      setEmotionIcon("😳")
    }
  }
  useEffect(()=>{
    textEmotionToIcon(emotion);
  }, [])


  console.log('detail = ' + detail.title)
  return (
    <div onClick={moveToDetail}>
      <Container>
      
      <div style={{display : 'flex', justifyContent : 'space-between'}}>
        <div style={{width : "70%"}}>
          <h4>{emotionIcon} {detail.title}</h4>
          <div style={{height : "150px", fontSize : '11.5pt'}}>{detail.content.substr(0,150)}...</div>

          <div style={{fontSize : '10pt'}}>{detail.created_at}</div>
        </div>

        <Figure style={{float : "right", width : "20%" }}>
        <Figure.Image
          width={500}
          height={500}
          alt="게시물 사진"
          src={detail.photo}
          // src= "https://file.mk.co.kr/meet/neds/2022/08/image_readtop_2022_763920_16617714675151210.jpg"
        />
        </Figure>
      </div>  
      <hr/>
        </Container>
    
    </div>
  )
}

export default PostCard