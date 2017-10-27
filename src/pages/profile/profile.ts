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
  schoolList : FirebaseListObservable<any[]>;
  workList : FirebaseListObservable<any[]>;
  skillList : FirebaseListObservable<any[]>;
  hobbies : string[];
  userLogin : any;
  public userId : string;
  authState: any = null;
  
  
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, private app: App, private af: AngularFire)  {
    this.profile = af.database.list('/consultants'); 
    this.userLogin = firebase.auth().currentUser;

    //Formattage de l'id de l'utilisateur courant
    this.userId = this.userLogin.email.split("@")[0].replace(".","");

    this.schoolList = af.database.list('/consultants/'+this.userId+'/etudes', {
      query: {
        orderByChild: 'date'
      }
    }); 
    this.workList = af.database.list('/consultants/'+this.userId+'/experiences', {
      query: {
        orderByChild: 'date'
      }
    }); 
    this.skillList = af.database.list('/consultants/'+this.userId+'/competences'); 

    
    // Get a reference to the hobbies
    this.hobbies = [];
    let instance = this;
    let ref = firebase.database().ref('/consultants/'+this.userId+'/hobbies');

    // Get the hobbies
    ref.on("child_added", function(snapshot) {
      instance.hobbies.push(snapshot.val());
    });
      
  
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
