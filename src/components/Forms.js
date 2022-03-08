import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AuthorForm from './AuthorForm'
import BookForm from './BookForm'

const Forms = () => {

  return (
    <Row >
      <Col xs={6}>
        <BookForm/>
      </Col>
      <Col xs={6}>
        <AuthorForm/>
      </Col>
    </Row>
  )
}

export default Forms