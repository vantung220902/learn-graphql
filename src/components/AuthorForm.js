import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useMutation } from '@apollo/client'
import {  getAuthors } from '../graphql-client/query'
import { addAuthorQL } from '../graphql-client/mutation'
const AuthorForm = () => {
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        age:0
    })
    const [createAuthor, dataMutation] = useMutation(addAuthorQL)
    const onChangeInput = (event) => {
        setNewAuthor({
            ...newAuthor,
            [event.target.name]: event.target.value
        })
    }
    const onSubmit = (event) => {
        event.preventDefault()
        createAuthor({
            variables: { ...newAuthor, age: parseInt(newAuthor.age) },
            refetchQueries: [{ query: getAuthors }]
        })
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className='invisible mb-2'>
                <Form.Control />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Control type='text' placeholder='Author Name' name='name'
                    onChange={onChangeInput}/>
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Control type='number' placeholder='Author Age' name='age'
                    onChange={onChangeInput} />
            </Form.Group>
            <Button className='float-right' variant='info' type='submit'
            >
                Add Author
            </Button>
        </Form>
    )
}

export default AuthorForm