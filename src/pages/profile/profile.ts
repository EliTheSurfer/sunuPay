import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, private app: App) {

  }

  logout(){
	//clear any cached data
	this.app.getRootNav().setRoot(LoginPage);
	}

}
