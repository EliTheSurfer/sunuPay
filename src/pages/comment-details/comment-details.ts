import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firebase } from 'ionic-native';
import { FirebaseListObservable, AngularFire } from 'angularfire2';

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
export class CommentDetailsPage {

  //Le post que l'on veut commenter
  clickedPost : any;
  //La liste des commentaires du post
  currentCommentList : FirebaseListObservable<any[]>;;

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    //Recuperation des informations du post
    this.clickedPost = navParams.get("post");
    //indexation des commentaires
    this.currentCommentList  = af.database.list('/timeline/'+this.clickedPost.$key+'/commentairesList'); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentDetailsPage');
  }

}
