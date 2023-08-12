import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-deleted-todo',
  templateUrl: './deleted-todo.component.html',
  styleUrls: ['./deleted-todo.component.css']
})
export class DeletedTodoComponent implements OnInit{
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getallDeletedTodos();
  }

  getallDeletedTodos(){
    this.todoService.getAllDeletedTodos().subscribe({ next : (response) => { this. todos = response }});
  }

  undoDeleteTodo(id: string, todo: Todo) {
    this.todoService.undoDeleteTodo(id, todo).subscribe({ next: (response) => { this.getallDeletedTodos(); }});
  }
}
