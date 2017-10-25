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
  textToPublish : any;
  
  userLogin : string ;
  userId : string ;

  //données d'un post
  commentaire : string;
  date : Date;
  nom : string;
  prenoms : string;
  texte  : string;
  photo : string;
  model : PostModel;
  timeline : any;


  constructor(public navCtrl: NavController,public element: ElementRef,private keyboard: Keyboard,af: AngularFire, public navParams: NavParams) { 

    this.model = new PostModel();
    this.userLogin = firebase.auth().currentUser.email;    
    this.userId = this.userLogin.split("@")[0].replace(".","");
    console.log(this.userId);
    let instance = this;
    let consultant = firebase.database().ref('/consultants/'+this.userId);
    consultant.once("value")
              .then(function(snapshot) {
                   instance.nom = snapshot.child("nom").val();
                   instance.prenoms = snapshot.child("prenoms").val();
                   instance.photo = snapshot.child("photoDeProfil").val();
    });

     this.timeline = af.database.list('timeline');
    
    
    
  }
  ngOnInit(){
    this.root = this.element.nativeElement;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailsPage');
  }

  publish(){

    this.model.setNom(this.nom);
    this.model.setPhoto(this.photo);
    console.log(this.photo);
    this.model.setPrenoms(this.prenoms);
    this.model.setCommentNumber(0);
    this.model.setLikeNumber(0);
    this.model.setDate(new Date());
    this.model.setText(this.textToPublish);


    console.log("----------------");
    console.log(this.model);


    this.timeline.push(this.model);
    
    
  }

}
