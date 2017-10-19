import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire,AngularFireModule,AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';




@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profile : FirebaseListObservable<any[]>;
  consultant : FirebaseListObservable<any[]>;
  schoolList : FirebaseListObservable<any[]>;
  workList : FirebaseListObservable<any[]>;
  userLogin : any;
  authState: any = null;
  
  
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, private app: App, private af: AngularFire)  {
    this.profile = af.database.list('/consultants');    
    this.schoolList = af.database.list('/consultants/id/Etudes', {
      query: {
        orderByChild: 'date'
      }
    }); 
    this.workList = af.database.list('/consultants/id/Experiences', {
      query: {
        orderByChild: 'date'
      }
    }); 
    this.userLogin = firebase.auth().currentUser;
    console.log(this.userLogin.email);
    

  }

  logout(){
	//clear any cached data
	this.app.getRootNav().setRoot(LoginPage);
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }


}
