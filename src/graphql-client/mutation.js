import { gql } from '@apollo/client';

const addBookQL = gql`
mutation addBookMutation($name:String,$genre:String,$authorId:ID!){
    createBook(name:$name,genre:$genre,authorId:$authorId){
        id
        name
    }
}
`
const addAuthorQL = gql`
mutation addAuthorMutation($name:String,$age:Int){
    createAuthor(name:$name,age:$age){
        id
        name
        age
    }
}
`
export { addBookQL, addAuthorQL };