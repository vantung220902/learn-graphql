const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

//Load schema & resolver
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver')

//load db method
const mongoDataMethods = require('./data/db');

//connect to MongoDB
const url = 'mongodb+srv://tungCoder:22092002hvhghtT@graphqltutorial.j2kpe.mongodb.net/graphqlTutorial?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
        await mongoose.connect(url,
            err => {
                if (err) throw err;
                console.log('connected to MongoDB')
            });
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB()
const app = express()
let server = null
const cors = require('cors');
app.use(cors())
async function startServer() {
    server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({mongoDataMethods})
    })

    await server.start();
    server.applyMiddleware({ app });
}
startServer()

app.listen({ port: 4000 }, () => {
    console.log(`listening at http://localhost:4000${server.graphqlPath}`)
})
