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
  
  constructor(public navCtrl: NavController, private app: App, private af: AngularFire)  {
    this.profile = af.database.list('/consultants');    
    this.schoolList = af.database.list('/consultants/id/Etudes');    
  }

  logout(){
	//clear any cached data
	this.app.getRootNav().setRoot(LoginPage);
	}

}
