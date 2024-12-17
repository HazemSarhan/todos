import ToDo from '../models/ToDo.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/badRequest.js';
import NotFoundError from '../errors/notFound.js';

export const createToDo = async (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    throw new BadRequestError('Please provide a title');
  }

  const toDo = await ToDo.create({ title: title, completed: completed });
  res.status(StatusCodes.CREATED).json(toDo);
};

export const getAllToDos = async (req, res) => {
  const toDos = await ToDo.find({});
  res.status(StatusCodes.OK).json(toDos);
};

export const getToDo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await ToDo.findOne({ _id: todoId });
  if (!todo) {
    throw new NotFoundError(`No todo with id : ${todoId}`);
  }
  res.status(StatusCodes.OK).json(todo);
};

export const updateToDo = async (req, res) => {
  const { title, completed } = req.body;
  const { id: todoId } = req.params;
  const todo = await ToDo.findOneAndUpdate(
    { _id: todoId },
    { title: title, completed: completed },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!todo) {
    throw new NotFoundError(`No todo with id : ${todoId}`);
  }
  res.status(StatusCodes.OK).json(todo);
};

export const deleteToDo = async (req, res) => {
  const { id: todoId } = req.params;
  await ToDo.findByIdAndDelete({ _id: todoId });
  res.status(StatusCodes.OK).json({ msg: 'ToDo deleted successfully' });
};
