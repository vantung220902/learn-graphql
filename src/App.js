import Container from 'react-bootstrap/Container'
import BookList from './components/BookList'
import Form from './components/Forms'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),

})

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className='py-3 mt-3'
        style={{ backgroundColor: 'lightcyan' }}>
        <h1 className='text-center text-info mb3'>
          My Book
        </h1>
        <hr />
        <Form />
        <hr />
        <BookList />

      </Container>
    </ApolloProvider>

  )
}

export default App
