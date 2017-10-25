export class PostModel {
  //données d'un post
  private date : Date;
  private nom : any;
  private prenoms : string; 
  private texte  : string;
  private photoDeProfil : string;
  private like : number;
  private commentaire : number;

  constructor() {}
  
  public   setDate( dateToSet : any){
      this.date = dateToSet;
  }

  public get getDate():any {
      return this.date;
  }

  public  setNom( nomToSet : any) {
    this.nom = nomToSet;
    }

  public get getNom():any {
        return this.nom;
    }

    public setPrenoms( prenomToSet : any){
        this.prenoms = prenomToSet;
    }

    public get getPrenom():any {
        return this.prenoms;
    }

    public setText( textToSet : any){
        this.texte = textToSet;
    }

    public get getText():any {
        return this.texte;
    }

    public setPhoto( photoToSet : any){
        this.photoDeProfil = photoToSet;
    }

    public get getPhoto():any {
        return this.photo;
    }
    

    public setLikeNumber( LikeNumberToSet : any){
        this.like = LikeNumberToSet;
    }

    public get getLikeNumber():any {
        return this.like;
    }

    public setCommentNumber( commentNumberToSet : any){
        this.commentaire = commentNumberToSet;
    }

    public get getCommentNumber():any {
        return this.commentaire;
    }
    




}
