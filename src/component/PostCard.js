import React from 'react'
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const PostCard = ({detail}) => {
  const moveToDetail = () => {
    
  }
  console.log('detail = ' + detail.title)
  return (
    <div onClick={moveToDetail}>
      <Container>
        <Row>
          <Col>(이모티콘) {detail.title}</Col>
        </Row>
        <Row>
          <Col>d</Col>
        </Row>
        <Row>
          <Col>{detail.created_at}</Col>
        </Row>
        <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="게시물 사진"
          src={detail.photo}
        />
        </Figure>

        <br/><br/><br/>

        </Container>
    
    </div>
  )
}

export default PostCard