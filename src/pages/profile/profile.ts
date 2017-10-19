import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFire,AngularFireModule,AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';



@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  profile : FirebaseListObservable<any[]>;
  schoolList : FirebaseListObservable<any[]>;
  workList : FirebaseListObservable<any[]>;
  userlogin : string;
  authState: any = null;
  
  
  constructor(public navCtrl: NavController, private app: App, private af: AngularFire)  {
    this.profile = af.database.list('/consultants');    
    this.userlogin = this.authenticated ? this.authState.uid : '';
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
