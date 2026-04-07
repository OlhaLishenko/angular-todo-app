import { Injectable, signal } from '@angular/core';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, startWith, switchMap, tap, BehaviorSubject } from 'rxjs';

const USER_ID = 2;
const API_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  refresh$$ = new BehaviorSubject(null);
  todos$: Observable<Todo[]>;

  constructor(private http: HttpClient) {
    this.todos$ = this.refresh$$.pipe(
      startWith(null),
      switchMap(() => this.getTodos()),
    );
  }

  getTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
  }

  createTodo(title: string) {
    const newTodo = {
      title: title,
      userId: USER_ID,
      completed: false,
    };

    return this.http
      .post<Todo>(`${API_URL}/todos`, newTodo)
      .pipe(tap(() => this.refresh$$.next(null)));
  }

  updateTodo(todo: Todo) {
    return this.http
      .patch<Todo>(`${API_URL}/todos/${todo.id}`, todo)
      .pipe(tap(() => this.refresh$$.next(null)));
  }

  deleteTodo(todo: Todo) {
    return this.http
      .delete(`${API_URL}/todos/${todo.id}`)
      .pipe(tap(() => this.refresh$$.next(null)));
  }
}
