import React, { useState } from 'react'
import  Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import { addBookQL } from '../graphql-client/mutation'
import { useMutation, useQuery } from '@apollo/client';
import { getBooks, getAuthors } from '../graphql-client/query';
const BookForm = () => {
    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });
    const [addBook, dataMutation] = useMutation(addBookQL)
    const { loading, error, data } = useQuery(getAuthors)
    if (error) console.error(error)

    const onInputChange = (event) => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value,
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        addBook({
            variables: { ...newBook },
            refetchQueries: [{ query: getBooks }]
        })
        setNewBook({
            name: '',
            genre: '',
            authorId: ''
        })
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className='mb-4'>
                <Form.Control type='text' placeholder='Book Name'
                    name='name' onChange={onInputChange} value={newBook.name} />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Control type='text' placeholder='Book Genre'
                    name='genre' onChange={onInputChange} value={newBook.genre} />
            </Form.Group>
            <Form.Group className='mb-4'>
                {loading ? <p>Loading author...</p> : (
                    <Form.Control as='select'
                        name='authorId' onChange={onInputChange} value={newBook.authorId}>
                        <option disabled value={''}>
                            Select author
                        </option>
                        {data.authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </Form.Control>
                )}

            </Form.Group>
            <Button className='float-right' variant='info' type='submit'>
                Add Book
            </Button>
        </Form>
    )
}

export default BookForm