import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { TodosStore } from '../store/todo.store';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    NgStyle,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectionList,
    MatListOption,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  store = inject(TodosStore);

  async onAddTodo(title: string): Promise<void> {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent): Promise<void> {
    event.stopPropagation();

    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, completed: boolean): Promise<void> {
    await this.store.updateTodo(id, completed);
  }
}
