import React from 'react'
import {Figure, Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
const PostCard = ({detail}) => {
  const moveToDetail = () => {
    
  }
  console.log('detail = ' + detail.title)
  return (
    <Link to={`/diary-detail/${detail.id}`}>
      <Container>
        <Row>
          <Col>{detail.title} </Col>
        </Row>
        <Row>
          <Col>{moment(detail.created_at).format('YYYY년 MM월 DD일')}</Col>
        </Row>
        {
          detail.photo && (
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="게시물 사진"
                src={detail.photo}
              />
            </Figure> 
          )
        }
        

        <br/><br/><br/> 

        </Container>
    </Link>
  )
}

export default PostCard