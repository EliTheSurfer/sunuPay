import { PostModel } from './../../models/postModel';
import { userInformationService } from './../../providers/userInformation-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../providers/auth-service';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFire, AngularFireModule,FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { PostDetailsPage } from '../post-details/post-details'
import * as firebase from 'firebase';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'jobs.html'
})
export class JobsPage {

  userId : string;    
  timeline : FirebaseListObservable<any[]>;  
  items : FirebaseListObservable<any[]>;  
  currentUserInformations : FirebaseObjectObservable <any[]>;
  
  userLogin : any;

  
  textToPublish : string;
  

  //données d'un post
  commentaire : string;
  date : Date;
  nom : string;
  prenoms : string;
  photo : string;
  model : PostModel;
  

  constructor(private currentUserInformation : userInformationService,public navCtrl: NavController,public af: AngularFire,private _auth: AuthService) {

    this.userLogin = firebase.auth().currentUser;    
    this.userId = this.userLogin.email.split("@")[0].replace(".","");
    console.log(this.userId);


    this.timeline = af.database.list('/timeline');  
    this.items = af.database.list('items');
    
    let ref = firebase.database().ref('/consultants/'+this.userId);
    

    this.currentUserInformations = af.database.object('/consultants/'+this.userId,  { preserveSnapshot: true });
    console.log(this.currentUserInformations.subscribe(snapshot => {    console.log(snapshot.values)
    }));

    //

    //Iniatialisation du modele de post
    this.model = new PostModel();
    this.textToPublish ="";

    //Recupererons l'id de l'utilisateur actuel 
    this.userLogin = firebase.auth().currentUser.email;    
    this.userId = this.userLogin.split("@")[0].replace(".","");
    
    //Recuperons les informations de l'utilisateur actuel
    let instance = this;
    let consultant = firebase.database().ref('/consultants/'+this.userId);
    consultant.once("value")
              .then(function(snapshot) {
                   instance.nom = snapshot.child("nom").val();
                   instance.prenoms = snapshot.child("prenoms").val();
                   instance.photo = snapshot.child("photoDeProfil").val();
    });

    //connexion a la timeline
     this.timeline = af.database.list('timeline');
   


  }

  goToPost() {
    this.navCtrl.push(PostDetailsPage,{
      writer : this.currentUserInformations
    } );

  }

  /**
   * Fonction qui permet a l'utilisateur connecté de liker un post
   * @param message type PostModel
   */
  toLike(message : any){
    //Si l'utilisateur n'a pas déja liké le post alors il like
    if(message.likersList.indexOf(this.currentUserInformation.userId)<0)
    {
      let likeNumber = message.like +1;      
      let likersList = (message.likersList +","+ this.currentUserInformation.userId);
      let likerRef =this.af.database.list('/timeline/');
      likerRef.update(message.$key,{like : likeNumber});
      likerRef.update(message.$key,{likersList : likersList});
    }
  }

  /**
   * Fonction qui permet d'enlever le like de l'utilisateur connecté concernant un post
   * @param message type PostModel 
   */
  toUnlike(message : any){
    //Si l'utilisateur a déja liké alors il peut enlever son like
    if(message.likersList.indexOf(this.currentUserInformation.userId)>0)
    {
      let likeNumber = message.like -1;      
      let likersList = (message.likersList.replace(","+this.currentUserInformation.userId,""));
      let likerRef =this.af.database.list('/timeline/');
      likerRef.update(message.$key,{like : likeNumber});
      likerRef.update(message.$key,{likersList : likersList});
    } 
    
  }

  /**
   * Publier un statut
   */
  publish(){
    
        //On recupere les informations du post a envoyer
        this.model.setNom(this.nom);
        this.model.setPhoto(this.photo);
        this.model.setPrenoms(this.prenoms);
        this.model.setCommentNumber(0);
        this.model.setLikeNumber(0);
        this.model.setDate(new Date().toLocaleString());
        this.model.setText(this.textToPublish);
        this.model.setLikersList("");
    
    
        //On envoie le post
        this.timeline.push(this.model);
        this.textToPublish ="";    
        
      }



}
