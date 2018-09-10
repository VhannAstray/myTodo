import { Injectable } from '@angular/core';

// Importer les modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Définit un Sujet observable de type TodoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  constructor() { }

  /**
   * Méthode permettant aux autres classes de souscrire (s'abonner) le sujet
   */
  public getTodo(): Observable<TodoInterface> {
    return this.todoSubject.asObservable();
  }

  /**
   * Diffuse le sujet vers les abonnés
   * @param todo TodoInterface un todo qui passe par là
   */
  public sendTodo (todo: TodoInterface) {
    this.todoSubject.next(todo);
  }
}
