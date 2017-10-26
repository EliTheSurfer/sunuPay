import { ChatDetailsPage } from './../chat-details/chat-details';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  consultants : FirebaseListObservable<any[]>;  

  constructor(public navCtrl: NavController, private af: AngularFire) {
    this.consultants = af.database.list('/consultants');    
  }


  chatWith(profil : any) {
    this.navCtrl.push(ChatDetailsPage,{
      profil: profil
    } );
    
  }
}
