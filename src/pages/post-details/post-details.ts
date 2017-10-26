import { JobsPage } from './../jobs/jobs';
import { PostModel } from './../../models/postModel';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';
import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import * as firebase from 'firebase';


/**
 * Generated class for the PostDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post-details',
  templateUrl: 'post-details.html',
})
export class PostDetailsPage {

  root:any;
  profil : FirebaseObjectObservable<any[]>;
  textToPublish : string;
  
  userLogin : string ;
  userId : string ;

  //données d'un post
  commentaire : string;
  date : Date;
  nom : string;
  prenoms : string;
  photo : string;
  model : PostModel;
  timeline : any;


  constructor(public navCtrl: NavController,public element: ElementRef,private keyboard: Keyboard,af: AngularFire, public navParams: NavParams) { 

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
  ngOnInit(){
    this.root = this.element.nativeElement;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailsPage');
  }

  publish(){

    //On recupere les informations du post a envoyer
    this.model.setNom(this.nom);
    this.model.setPhoto(this.photo);
    this.model.setPrenoms(this.prenoms);
    this.model.setCommentNumber(0);
    this.model.setLikeNumber(0);
    this.model.setDate(new Date().toLocaleString());
    this.model.setText(this.textToPublish);


    //On envoie le post
    this.timeline.push(this.model);
    this.textToPublish ="";
    this.navCtrl.push(JobsPage);

    
  }

}
