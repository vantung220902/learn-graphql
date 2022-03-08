import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'
import BookDetail from './BookDetail'

import { useQuery } from '@apollo/client'
import { getBooks } from '../graphql-client/query'

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooks)
  if (loading) return <p>Loading books...</p>
  if (error) return <p>Error loading books</p>

  return (
    <Container>
      <Row >
        <Col>
          {
            data.books.map(book => (
              <Col key={book.id} className='mb-2'>
                <Card border='info' text='info'
                  className='text-center shadow'
                  onClick={() => setBookSelected(book.id)}>
                  <Card.Body>
                    {book.name}
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Col>
        <Col>
          <BookDetail id={bookSelected} />
        </Col>

      </Row>
    </Container>

  )
}

export default BookList