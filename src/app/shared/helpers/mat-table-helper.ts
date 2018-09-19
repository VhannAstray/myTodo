import { MatColumns } from './../interfaces/mat-columns';

export class MatTableHelper {
    protected todoTableMap: Map<String, MatColumns> = new Map();

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
