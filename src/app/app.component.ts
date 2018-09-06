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
   * Constructeur de la classe AppComponent
   * Invoqué dès la création d'un objet  de type AppComponent
   */
  public constructor() {
    this.todos = [
      { title: 'Nouveau todo' },
      { title: 'What the fuck'}
    ];
  }

  /**
   * Ajoute un todo au tableau des todos
   * @return void
   */
  public addTodo(): void {
    this.todos.push({title: this.aTodo});
  }

  /**
   * Supprime un todo du tableau
   * @return void
   */
  public delete(index: number ):void {
    // console.log('Okay je dois enlever l\'élément à l\'indice : ');
    // console.log(index);
    this.todos.splice(index,1);
  }

  public changeTitle(): void {
    this.title = 'Hola Angular';
  }
}
