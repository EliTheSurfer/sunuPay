import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire,AngularFireModule,AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';


/**
 * Generated class for the ProfileDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html',
})
export class ProfileDetailsPage {
  public profil;
  profile : FirebaseListObservable<any[]>;
  schoolList : FirebaseListObservable<any[]>;
  workList : FirebaseListObservable<any[]>;
  skillList : FirebaseListObservable<any[]>;
  hobbies : string[];
  userLogin : any;
  userId : string;

  constructor(public navCtrl: NavController,private af: AngularFire, public navParams: NavParams) {
    this.profil = navParams.get("profil");
    this.profile = af.database.list('/consultants'); 
    this.userLogin = firebase.auth().currentUser;

    //Formattage de l'id de l'utilisateur courant
    this.userId = this.profil.id;

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

    console.log(this.schoolList)
    
    // Get a reference to the hobbies
    this.hobbies = [];
    let instance = this;
    let ref = firebase.database().ref('/consultants/'+this.userId+'/hobbies');

    // Get the hobbies
    ref.on("child_added", function(snapshot) {
      instance.hobbies.push(snapshot.val());
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileDetailsPage');
  }

}
