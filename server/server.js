import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectToMongoDB from './db/connectToMongoDB.js';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import testRoutes from './routes/test.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server listening on port ${PORT}`);
});
