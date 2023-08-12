import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit{
  todos: Todo[] = [];

  newTodo: Todo ={
    id: '',
    description: '',
    createdDate: new Date(),
    completedDate: new Date(),
    isCompleted: false,
    deletedDate: new Date(),
    isDeleted: false
  };

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todoService.getAllTodos().subscribe({ next: (todos) => this.todos = todos});
  }

  addTodo(){
    this.newTodo.id = '00000000-0000-0000-0000-000000000000';
    this.todoService.addTodo(this.newTodo).subscribe({ next: (todo) => {
      this.getAllTodos();
    }});
  }

  onCompletedchange(id: string, todo: Todo){

    todo.isCompleted = !todo.isCompleted;

    this.todoService.updateTodo(id,todo).subscribe({ next: (response) => { this.getAllTodos(); } });
  }

  deleteTodo(id: string){
    this.todoService.deleteTodo(id).subscribe({ next : (response) => { this.getAllTodos(); } });
  }
}
