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
  

  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {

    this.userLogin = firebase.auth().currentUser;    
    this.userId = this.userLogin.email.split("@")[0].replace(".","");
    console.log(this.userId);


    this.timeline = af.database.list('/timeline');  
    this.items = af.database.list('items');
    
    let ref = firebase.database().ref('/consultants/'+this.userId);
    

    this.currentUserInformations = af.database.object('/consultants/'+this.userId,  { preserveSnapshot: true });
    console.log(this.currentUserInformations.subscribe(snapshot => {    console.log(snapshot.values)
    }));
  }

 goToPost() {
  this.navCtrl.push(PostDetailsPage,{
     writer : this.currentUserInformations
  } );

 }

}
