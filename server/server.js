import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import connectToMongoDB from './db/connectToMongoDB.js';

import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import testRoutes from './routes/test.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// REST routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/posts', postRoutes);

// GraphQL
async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(PORT, () => {
        connectToMongoDB();
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startApolloServer();
