import express from 'express';
import {
  createToDo,
  getAllToDos,
  getToDo,
  updateToDo,
  deleteToDo,
} from '../controllers/todo.controller.js';

const router = express.Router();

router.route('/').post(createToDo).get(getAllToDos);
router.route('/:id').get(getToDo).patch(updateToDo).delete(deleteToDo);

export default router;
