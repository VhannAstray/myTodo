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
   * @var checkedStatus
   */
  public checkedStatus: Boolean;

  /**
   * Tableau de todos à afficher
   * @var TodoInter
   */
  private todos: TodoInterface[];

  constructor(private todoService: TodoService) {
    this.todos = []; // Définit le tableau des todos à afficher
    this.checkedStatus = false;
    this.todoSubscription = this.todoService.getTodo()
      .subscribe((todo) => {
        console.log('Observable Todo : ' + JSON.stringify(todo));
        //Ajoute le todo à la liste des todos
        // s'il n'existe pas déjà ...
        if (this.todos.indexOf(todo) === -1)
          this.todos.push(todo);
      });
  }

  /**
   * Après la construction de l'objet, on charge la liste des todos
   * existant dans la base
   */
  ngOnInit() {
    // Récupère les todos existants dans la base
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a ' + this.todos.length + ' todos à afficher.');
    });
  }

  /**
   * Méthode de supression unique
   */
  public remove(index: number): void {
    const _todo = this.todos[index];
    this.todos.splice(index, 1);
    this.todoService.deleteTodo(_todo);
  }

  /**
   * Coche toute les cases à cochés
   */
  public checkUncheckAll(): void {
    this.checkedStatus = !this.checkedStatus;
    this._check();
  }

  /**
   * méthode qui vérifie les todos cochés.
   */
  private _check(): void {
    for (let index = 0; index < this.todos.length; index++)
      this.todos[index].isChecked = this.checkedStatus;
  }

  /**
  * Détermine l'état d'un todo checked or not
  * @param todo    
  */
  public isChecked(todo: TodoInterface): Boolean {
    return todo.isChecked;
  }

  /**
   * Méthode qui vérifie la liste des todos pour voir si tout est coché.
  */
  private _allChecked(): Boolean {
    let allChecked: Boolean = true;
    for (const todo of this.todos) {

      if (!todo.isChecked) {
        allChecked = false;
      }
    }
    return allChecked;
  }

  /**
     * Retire les todos sélectionnés
     * @return void
     */
  public removeTodoSel(): void {
    const _todos: TodoInterface[] = [];

    for (const todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      } else {
        this.todoService.deleteTodo(todo);
      }
    }
    this.todos = _todos;

    if (this.todos.length === 0) {
      this.checkedStatus = false;
    }
  }

  /**
  * Détermine si oui ou non aucune boîte n'est cochée
  */
  public noneChecked(): Boolean {
    let status: Boolean = true;
    for (const todo of this.todos) {
      if (todo.isChecked) {
        status = false;
      }
    }
    return status;
  }

  /**
   * Détermine si on a bien saisi 5 caractères en saisie.
   */
  public inputValid(): Boolean {
    return this.todos.length < 5;
  }

  /**
   * Ajoute un todo au tableau des todos
   * @return void
   */
  public addTodo(): void {
    // this.todos.push(
    //   {
    //     title: this.aTodo,
    //     isChecked: false,
    //     begin: '',
    //     end:''
    //   }
    // );
    // this.aTodo = '';
  }

  /**
   * Transmets le todo à modifier au formulaire
   * @param todo 
   */
  public update(todo: TodoInterface): void {
    console.log('modification du todo : ' + todo.id);
    this.todoService.sendTodo(todo);
  }

  /**
   * Supprime un todo du tableau
   * @return void
   */
  public delete(index: number): void {
    // console.log('Okay je dois enlever l\'élément à l\'indice : ');
    // console.log(index);
    this.todos.splice(index, 1);
  }

  /**
   * Bascule l'état de isChcekd d'un todo
   * @param index Indice de l'élément dans le tableau
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
    this.checkedStatus = this._allChecked();
  }
}
