import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firebase } from 'ionic-native';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { collectAndResolveStyles } from 'angularfire2/node_modules/@angular/core/src/animation/animation_style_util';

/**
 * Generated class for the CommentDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-comment-details',
  templateUrl: 'comment-details.html',
})

/**
 * Objet Commentaire
 */
class comment{
  displayName : string;
  text : any;
  date : any;
  photoDeProfil : string; 
}

export class CommentDetailsPage {

  //Le post que l'on veut commenter
  clickedPost : any;
  //La liste des commentaires du post
  currentCommentList : FirebaseListObservable<any[]>;
  commentToPublish : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    //Recuperation des informations du post
    this.clickedPost = navParams.get("post");
    //indexation des commentaires
    this.currentCommentList  = af.database.list('/timeline/'+this.clickedPost.$key+'/commentairesList'); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentDetailsPage');
  }

  /**
   * 
   */
  publishComment(){
    let commentToPublish = new comment();
    commentToPublish.text = this.commentToPublish;
    commentToPublish.displayName =  "Elimane Sall"
    commentToPublish.photoDeProfil = "https://firebasestorage.googleapis.com/v0/b/neolynker.appspot.com/o/photo%20d%20identite%20formatee.jpg?alt=media&token=2321fa9d-0aab-4dad-87bd-26099474c087";
    commentToPublish.date = new Date().toLocaleDateString();
    this.currentCommentList.push(commentToPublish);
    this.commentToPublish = "";

  }

}


