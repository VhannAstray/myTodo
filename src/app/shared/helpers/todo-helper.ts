import { MatColumns } from './../interfaces/mat-columns';

export class TodoHelper {
    private todoTableMap: Map<String, MatColumns> = new Map();

    public constructor() {
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

    /**
     * Méthode qui renvoi la liste des colonnes à afficher
     */
    public getDisplayedColumns(): String[] {
        const toDisplay: String[] = [];

        this.todoTableMap.forEach((column) => {
            if (column.isDisplayed) {
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }

    /**
     * Renvoi la colonne passé en 'key'
     * @param key Paramètre correspondant à la colonne
     */
    public getColumn(key: String): MatColumns {
        return this.todoTableMap.get(key);
    }

    /**
     * Retourne les colonnes à afficher dans la liste à sélectionné
     */
    public getOptionalColumns(): MatColumns[] {
        const toDisplayList: MatColumns[] = [];
        this.todoTableMap.forEach((column) => {
            if (!column.always) {
                toDisplayList.push(column);
            }
        });
        return toDisplayList;
    }

    /**
     * Méthode qui change la visibilité d'un élément passer en paramètre
     * @param key Chaîne de caractères représentant la colonne
     */
    public toggleVisibility(key: String) {
        let colonneTemp: MatColumns = this.todoTableMap.get(key);
        colonneTemp.isDisplayed = !colonneTemp.isDisplayed;
        this.todoTableMap.set(key, colonneTemp);
    }

    /** Méthode de Jean luc */
    /**
     * Retourne la liste des colonnes à afficher
     * @param userSelection userSelection Tableau contenant la sélection utilisateur
     */
    public setDisplayedColumns(userSelection: String[]): String[] {
        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                if (userSelection.indexOf(column.value) === -1) {
                    column.isDisplayed = false;
                } else {
                    column.isDisplayed = true;
                }
                this.todoTableMap.set(key, column);
            }
        });
        return this.getDisplayedColumns();
    }

    /**
     * Retourne le tableau des colonnes optionnelles
     */
    public optionalColumnsToArray(): String[] {
        const toDisplay: String[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }
}
