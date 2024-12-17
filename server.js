import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

import morgan from 'morgan';

// DB Connection
import connectDB from './db/connect.js';
import ToDo from './models/ToDo.js';

import toDoRoutes from './routes/todo.routes.js';

// Middleware
import notFoundMiddleware from './middleware/notFound.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('./public'));

// EJS Configurations
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/api/v1/todo', toDoRoutes);

app.get('/', async (req, res) => {
  const allTodos = await ToDo.find({});
  const completedTodos = allTodos.filter((todo) => todo.completed);
  const uncompletedTodos = allTodos.filter((todo) => !todo.completed);
  res.render('index', {
    completedTodos,
    uncompletedTodos,
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
