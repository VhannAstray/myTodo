import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService } from "./../../shared/services/todo.service";
import { TodoInterface } from '../../shared/interfaces/todo-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  /**
   * @var todoForm: FormGroup Prise en charge du formulaire
   * par ReactiveForm
   */
  public todoForm: FormGroup;

  /** 
 * Abonnement à un todo qui vient du tableau des todos
 * et qui passe par l'intermédiaire du service
 */
  private todoSubscription: Subscription;

  /**
   * Définit un objet todo à mettre à jour
   * @var todoToUpdate: TodoInterface todo qui vient du tableau
   */
  private todoToUpdate: TodoInterface;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {
    // Objet todoToUpdate vide
    this.todoToUpdate = {
      title: '',
      begin: new Date(),
      end: new Date()
    };

    // Abonnement au todo
    this.todoSubscription = this.todoService.getTodo().subscribe((unTodo) => {
      console.log('je viens de recevoir un todo : ' + JSON.stringify(unTodo));
      this.todoToUpdate = unTodo;
      this._loadForm();
    });
  }

  /**
   * @return FormControl Contrôle title du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }

  /**
   * Méthode définie dans l'interface OnInit
   * Est appelée immédiatement après le constructeur
   * de la classe courante.
   * Construction du formulaire todoForm
   */
  ngOnInit() {
    // Définit le formulaire, ce qu'il contient
    // et les règles de validation du formulaire
    // J'ai bien un todo qu m'a été transmis
    this.todoForm = this.formBuilder.group(
      {
        title: [
          this.todoToUpdate.title, // Valeur par défaut pour le contrôle title
          [Validators.required, Validators.minLength(5)] // Règle de validation à appliquer
        ],
        begin: [
          this.todoToUpdate.begin,
          [Validators.required]
        ],
        end: [
          this.todoToUpdate.end,
          [Validators.required]
        ]
      },
      {
        validator: Validators.compose([
          DateValidators.dateLessThan('begin', 'end', { 'begin': true })
        ])
      }
    );
  }
  /**
   * Emet le nouveau todo vers le service TodoService
   */
  public saveTodo(): void {
    const _todo: TodoInterface = this.todoForm.value;
    _todo.isChecked = false;
    this.todoService.addTodo(
      _todo
    );
  }
  private _loadForm(): void {
    this.ngOnInit();
  }
}
