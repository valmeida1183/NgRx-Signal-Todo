import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    JsonPipe,
    TodoListComponent,
    MatProgressSpinnerModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'ngrx-signal-store';
  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos().then(() => console.log('Todos Loaded!'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
