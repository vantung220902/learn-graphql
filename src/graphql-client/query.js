import { gql } from "@apollo/client";

const getBooks = gql`
    query getBooksQuery{
        books{
            name
            id
        }
    }
`
const getBookById = gql`
query getBookByIdQuery ($id:ID!){
    book(id:$id){
        id
        name
        genre
        author{
            id
            name
            books{
                name
                id
            }
        }
    }
}`
const getAuthors = gql`
    query getAuthorsQuery{
        authors{
            id
            name
        }
    }
`

export { getBooks, getBookById, getAuthors }