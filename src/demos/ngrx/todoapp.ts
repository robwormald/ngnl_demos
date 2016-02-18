import {Component, Injectable} from 'angular2/core'
import {provideStore, Store} from '@ngrx/store'
import {todos, visibilityFilter} from './todos';
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'todo-app',
  template: `
    <h2>Todos</h2>
    <input #newtodo type="text"/>
    <button (click)="addTodo(newtodo)">add</button>
    <ul>
      <li *ngFor="#todo of todos | async">{{todo.text}}</li>
    </ul>
  `,
  providers: [provideStore({todos})]
})
export class TodoApp {
  todos: Observable<any[]>
  constructor(private store:Store<any>){
    this.todos = store.select('todos');
  }
  addTodo(el){
    this.store.dispatch({type: 'ADD_TODO', payload: {
      text: el.value
    }});
    
    el.value = ''
  }
}
