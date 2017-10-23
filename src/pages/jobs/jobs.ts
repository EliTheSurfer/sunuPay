import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFire, AngularFireModule, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'jobs.html'
})
export class JobsPage {

  timeline : FirebaseListObservable<any[]>;  

	items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
    this.timeline = af.database.list('/timeline');    
    this.items = af.database.list('/items');
  }


}
