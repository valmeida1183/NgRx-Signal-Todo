import { Injectable } from '@angular/core';
import { mockTodos } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  async getTodos() {
    await sleep(2000);
    return mockTodos;
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(2000);

    return {
      ...todo,
      id: Math.random().toString(36).substring(2.9),
    } as Todo;
  }

  async deleteTodo(id: string) {
    await sleep(500);
  }

  async updateTodo(id: string, completed: boolean) {
    await sleep(500);
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
