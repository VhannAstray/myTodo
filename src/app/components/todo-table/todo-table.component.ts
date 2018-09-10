import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from "./../../shared/services/todo.service";
import { TodoInterface } from '../../shared/interfaces/todo-interface';


@Component({
  selector: 'todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  /** 
   * Abonnement à un todo qui vient de l'espace (meuh non.. de TodoService)
   */
  private todoSubscription: Subscription;

  /**
   * Tableau de todos à afficher
   * @var TodoInter
   */
  private todos: TodoInterface[];

  constructor(private todoService: TodoService) {
    this.todos = []; // Définit le tableau des todos à afficher
    this.todoSubscription = this.todoService.getTodo()
      .subscribe((todo) => {
        console.log('Observable Todo : '+JSON.stringify(todo));
        //Ajoute le todo à la liste des todos
        this.todos.push(todo);
      });
   }

  ngOnInit() {
  }

}
