export class chatMessageModel {
    //données d'un post
    private date : Date;
    private envoyeurId : string;
    private recepteurId : string; 
    private message  : string;
    private photoDeProfil : string;
    private etat : string;
  
    constructor() {}
    
    public   setDate( dateToSet : any){
        this.date = dateToSet;
    }
  
    public  getDate():any {
        return this.date;
    }
  
    public  setEnvoyeurId( envoyeurIdToSet : any) {
      this.envoyeurId = envoyeurIdToSet;
      }
  
    public  getEnvoyeurId():any {
          return this.envoyeurId;
      }
  
      public setRecepeteurId( RecepteurIdToSet : any){
          this.recepteurId = RecepteurIdToSet;
      }
  
      public  getMessage():any {
          return this.message;
      }
  
      public setMessage( MessageToSet : any){
          this.message = MessageToSet;
      }



        
      public setEtat( etatToSet : any){
            this.etat = etatToSet;
        }

        public  getEtat():any {
            return this.etat;
        }
  
      public setPhoto( photoToSet : any){
          this.photoDeProfil = photoToSet;
      }
  
      
      public  getPhoto():any {
          return this.photoDeProfil;
          
      }
  
  
  
  }
  