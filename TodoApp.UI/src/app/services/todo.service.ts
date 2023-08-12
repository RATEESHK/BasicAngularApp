import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseApiUrl: string = environment.apiConfig.uri;

  constructor(private http: HttpClient, private msalService: MsalService) { }

  getAllTodos(): Observable<Todo[]> {
    const headers = this.getHeaders();
    return this.http.get<Todo[]>(this.baseApiUrl + 'todo', { headers });
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.post<Todo>(this.baseApiUrl + 'todo', newTodo, { headers });
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.put<Todo>(this.baseApiUrl + 'todo/' + id, todo, { headers });
  }

  deleteTodo(id: string): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.delete<Todo>(this.baseApiUrl + 'todo/' + id, { headers });
  }

  getAllDeletedTodos(): Observable<Todo[]> {
    const headers = this.getHeaders();
    return this.http.get<Todo[]>(this.baseApiUrl + 'todo/archivedTodos', { headers });
  }

  undoDeleteTodo(id: string, todo: Todo): Observable<Todo> {
    const headers = this.getHeaders();
    return this.http.put<Todo>(this.baseApiUrl + 'todo/undoArchivedTodos/' + id, todo, { headers });
  }

  private getHeaders() {
    const token = this.msalService.instance.getActiveAccount()?.idToken;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
