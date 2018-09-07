import { Component } from '@angular/core';
import { TodoInterface } from './shared/interfaces/todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'ceQueVousVoulez';

  /**
   * @var todos: TodoInterface[]
   * Tableau des todos
   */
  public todos: TodoInterface[];

  /**
   * @var aTodo: String
   * Nouveau todo à ajouter à notre tableau
   */
  public aTodo: String;

  /**
   * @var checkedStatus
   */
  public checkedStatus:Boolean;

  /**
   * Constructeur de la classe AppComponent
   * Invoqué dès la création d'un objet  de type AppComponent
   */
  public constructor() {
    this.todos = [];
    this.aTodo = '';
    this.checkedStatus = false;
  }

  /**
   * Ajoute un todo au tableau des todos
   * @return void
   */
  public addTodo(): void {
    this.todos.push(
      {
        title: this.aTodo,
        isChecked: false
      }
    );
    this.aTodo = '';
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
   * Retire les todos sélectionnés
   * @return void
   */
  removeTodoSel(): void {
    const _todos: TodoInterface[] = [];

    for (const todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      }
    }
    this.todos = _todos;
  }

  /**
   * Bascule l'état de isChcekd d'un todo
   * @param index Indice de l'élément dans le tableau
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
    this.checkedStatus = this._allChecked();
  }

  /**
   * Change le titre (la variable Title)
   */
  public changeTitle(): void {
    this.title = 'Hola Angular';
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
    return this.aTodo.length < 5;
  }

  /**
   * Détermine l'état d'un todo checked or not
   * @param todo    
   */
  public isChecked(todo: TodoInterface): Boolean {
    return todo.isChecked;
  }

  /**
   * Coche toute les cases à cochés
   */
  public checkUncheckAll():void {
    this.checkedStatus = !this.checkedStatus;
    this._check();
  }

  /**
   * méthode qui vérifie les todos cochés.
   */
  private _check():void {
    for (let index = 0; index < this.todos.length; index++){
      this.todos[index].isChecked = this.checkedStatus;
    }
  }

  /**
   * Méthode qui vérifie la liste des todos pour voir si tout est coché.
  */
  private _allChecked():Boolean {
    let allChecked: Boolean = true;

    for (const todo of this.todos){
      if(!todo.isChecked){
        allChecked = false;
      }
    }
    return allChecked;
  }
}
