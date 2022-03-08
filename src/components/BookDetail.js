import React from 'react'
import Card from 'react-bootstrap/Card';
import { getBookById } from '../graphql-client/query'
import { useQuery } from '@apollo/client'
const BookDetail = ({ id }) => {
    const { loading, error, data } = useQuery(getBookById, {
        variables: {
            id
        },
        skip: id === null
    })
    if (loading) return <p>Loading book details...</p>
    if (error) {
        console.log(error.message)
        return <p>Error loading book details</p>
    }
    const book = id ? data.book : null;
    return (
        <Card bg='info' text='white' className='shadow'>
            <Card.Body>
                {
                    !book ? <Card.Text>Please select a book</Card.Text> : (
                        <>
                            <Card.Title>{book.name}</Card.Title>
                            <Card.Subtitle>
                                {book.genre}
                            </Card.Subtitle>

                            <p>
                                Author: {book.author.name}
                            </p>
                            <p>
                                Age:   {book.author.age}
                            </p>
                            <p>
                                All book by this author
                            </p>
                            <ul>
                                {
                                    book.author.books.map(item => (
                                        <li key={item.id}>
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    )
                }

            </Card.Body>
        </Card>
    )
}

export default BookDetail