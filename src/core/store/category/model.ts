import {Action, Computed} from 'easy-peasy';

export interface Todo {
  text: string;
  done: boolean;
}

export interface TodosModel {
  todos: Todo[];
  completedTodos: Computed<TodosModel, Todo[]>;
  addTodo: Action<TodosModel, Todo>;
}
