import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from '../model/todo.model';
import { computed, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'completed',
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => {
    return {
      async loadAll() {
        //atualiza a store para disparar o loading
        patchState(store, { loading: true });
        // busca os dados no httpSerivce
        const todos = await todoService.getTodos();
        //atualiza a store agora com os dados buscados e desligando o loading
        patchState(store, { todos, loading: false });
      },

      async addTodo(title: string) {
        //Não dispara o loading, (faz o add de forma otimista)
        const todo = await todoService.addTodo({ title, completed: false });
        //Adiciona o registro novo na lista de todo atual do store
        patchState(store, (state) => {
          return {
            todos: [...state.todos, todo],
          };
        });
      },

      async deleteTodo(id: string) {
        await todoService.deleteTodo(id);

        patchState(store, (state) => {
          return {
            todos: state.todos.filter((todo) => todo.id != id),
          };
        });
      },

      async updateTodo(id: string, completed: boolean) {
        await todoService.updateTodo(id, completed);
        patchState(store, (state) => {
          return {
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed } : todo
            ),
          };
        });
      },

      updateFilter(filter: TodosFilter) {
        patchState(store, { filter });
      },
    };
  }),
  withComputed((state) => {
    return {
      filteredTodos: computed(() => {
        const todos = state.todos();

        switch (state.filter()) {
          case 'all':
            return todos;
          case 'pending':
            return todos.filter((todo) => !todo.completed);
          case 'completed':
            return todos.filter((todo) => todo.completed);
        }
      }),
    };
  })
);
