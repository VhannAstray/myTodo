import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';

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
   * @var todos: Liste des todos 
  */
  

  constructor(private formBuilder: FormBuilder) { }

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
    this.todoForm = this.formBuilder.group(
      {
        title: [
          '', // Valeur par défaut pour le contrôle title
          [Validators.required, Validators.minLength(5)] // Règle de validation à appliquer
        ],
        begin: [
          '',
          [Validators.required]
        ],
        end: [
          '',
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
}
