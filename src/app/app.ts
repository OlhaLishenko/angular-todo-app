import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormsModule, // прості форми
  ReactiveFormsModule, // серйозні форми (основний підхід)
} from '@angular/forms'; // робота з формами
import { Todo } from './components/todo/todo';
import { Todo as TodoItem } from './types/todo';
import { TodoForm } from './components/todo-form/todo-form';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  standalone: true, // новий angular НЕ потребує NgModule
  templateUrl: './app.html', // HTML шаблон
  styleUrl: './app.scss', // стилі, можна в [...]
  imports: [FormsModule, ReactiveFormsModule, Todo, TodoForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  todosService = inject(TodosService);

  private _todos: TodoItem[] = [];
  activeTodos: TodoItem[] = [];
  // private todosService = inject(TodosService);

  // todos = signal<TodoItem[]>([]);

  // activeTodos = computed(() => {
  //   return this.todos().filter((todo: TodoItem) => !todo.completed);
  // });

  get todos() {
    return this._todos;
  }

  set todos(todos: TodoItem[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter((todo: TodoItem) => !todo.completed);
  }

  ngOnInit(): void {
    this.todosService.todos$.subscribe((todos) => (this.todos = todos));
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe();
  }

  deleteTodo(todo: TodoItem) {
    this.todosService.deleteTodo(todo).subscribe();
  }

  toggle(todo: TodoItem) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed }).subscribe();
  }

  renameTodo({ todo, title }: { todo: TodoItem; title: string }) {
    this.todosService.updateTodo({ ...todo, title }).subscribe();
  }
}
