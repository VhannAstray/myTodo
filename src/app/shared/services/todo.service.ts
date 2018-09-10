import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importer les modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Définit un Sujet observable de type TodoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  /**
   * Injection de dépendance HttpClient
   * @param _api : HttpClient Transport vers le backend
   */
  constructor(private _api: HttpClient) { }

  public getTodos(id: number = null): Observable<TodoInterface[]> {
    if(id !== null){
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT + '/' + id
      );
    }else{
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT
      );
    }
  }

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
  private sendTodo (todo: TodoInterface) {
    this.todoSubject.next(todo);
  }

  /**
   * Insère un todo dans la base de données et
   * diffuse le nouveau todo crée
   */
  public addTodo(todo: TodoInterface){
    this._api.post<TodoInterface[]>(
      Constants._API_ROOT,
      todo
    ).subscribe((addedTodo) => {
      addedTodo[0].isChecked = false;
      this.sendTodo(addedTodo[0]);
    })
  }
  
  /**
   * On retire le todo passé en paramètre et
   * diffuse le nouveau todo crée
   */
  public deleteTodo(todo: TodoInterface){
    this._api.delete<TodoInterface[]>(
      Constants._API_ROOT + '/' + todo.id
    ).subscribe((result) => {
      console.log('Suppression du todo id : ');
      console.log(result);
    })
  }
}
