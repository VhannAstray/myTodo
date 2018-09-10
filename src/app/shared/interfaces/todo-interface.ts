export interface TodoInterface {
    /**
     * @var (optional) id: number
     * Identifiant du todo
     */   
    id?: number;
    
    /**
     * Titre du Todo
     * @var String
     */
    title: String;

    /**
     * Date de début du todo
     * @var Date
     */
    begin: Date;

    /**
     * Date de Fin
     * @var Date
     */
    end: Date;

    /**
     * @var boolean
     * Vrai si le todo est coché
     */
    isChecked: Boolean;
}