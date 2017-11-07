export class PostModel {
  //données d'un post
  private date : Date;
  private nom : any;
  private likersList : string[];
  private prenoms : string; 
  private texte  : string;
  private photoDeProfil : string;
  private like : number;
  private commentaire : number;

  constructor() {}
  
  public   setDate( dateToSet : any){
      this.date = dateToSet;
  }

  public  getDate():any {
      return this.date;
  }

  public  setNom( nomToSet : any) {
    this.nom = nomToSet;
    }

  public  getNom():any {
        return this.nom;
    }

    public setPrenoms( prenomToSet : any){
        this.prenoms = prenomToSet;
    }

    public  getPrenom():any {
        return this.prenoms;
    }

    public setText( textToSet : any){
        this.texte = textToSet;
    }

    public  getText():any {
        return this.texte;
    }

    public setPhoto( photoToSet : any){
        this.photoDeProfil = photoToSet;
    }

    public  getPhoto():any {
        return this.photoDeProfil;
    }
    

    public setLikeNumber( LikeNumberToSet : any){
        this.like = LikeNumberToSet;
    }

    public  getLikeNumber():any {
        return this.like;
    }

    public setCommentNumber( commentNumberToSet : any){
        this.commentaire = commentNumberToSet;
    }

    public  getCommentNumber():any {
        return this.commentaire;
    }
    

    public setLikersList( likersListToSet : any){
        this.likersList= likersListToSet;
    }

    public  getLikersList():any {
        return this.likersList;
    }
    



}
