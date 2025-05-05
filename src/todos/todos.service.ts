import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  create(title: string, description?: string): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      title,
      description,
      isDone: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, isDone: boolean): Todo | undefined {
    const todo = this.findOne(id);
    if (todo) {
      todo.isDone = isDone;
    }
    return todo;
  }

  delete(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
