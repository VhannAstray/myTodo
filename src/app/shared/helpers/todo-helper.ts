import { MatTableHelper } from './mat-table-helper';

export class TodoHelper extends MatTableHelper{

    public constructor() {
        super(); //Instance la classe parent

        this.todoTableMap.set(
            'title',
            { title: 'A faire', always: true, value: 'title', isDisplayed: true }
        );
        this.todoTableMap.set(
            'begin',
            { title: 'Début', always: false, value: 'begin', isDisplayed: true }
        );
        this.todoTableMap.set(
            'end',
            { title: 'Fin', always: false, value: 'end', isDisplayed: true }
        );
        this.todoTableMap.set(
            'update',
            { title: '', always: true, value: 'update', isDisplayed: true }
        );
        this.todoTableMap.set(
            'delete',
            { title: '', always: true, value: 'delete', isDisplayed: true }
        );
    }
}
