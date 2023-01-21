import {action} from 'easy-peasy';
import {Todo, TodosModel} from './model';

export default {
  addTodo: action<TodosModel, Todo>((state, payload) => {
    state.todos.push(payload);
  }),
};
