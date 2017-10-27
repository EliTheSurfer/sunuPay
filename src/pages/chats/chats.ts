import { userInformationService } from './../../providers/userInformation-service';
import { ChatIdProviderService } from './../../providers/chatIdProvider-service';
import { ChatDetailsPage } from './../chat-details/chat-details';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';


@Component({
  selector: 'page-about',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  consultants : FirebaseListObservable<any[]>;  
  currentUser : any;  

  constructor(public navCtrl: NavController,private chatService : ChatIdProviderService, private currentUserInformation : userInformationService, private af: AngularFire) {
    this.currentUser = firebase.auth().currentUser;        
    this.consultants = af.database.list('/consultants'); 
  }


  chatWith(profil : any) {
    console.log(this.chatService.provideChatId(this.currentUserInformation.userId,profil.id));
    this.navCtrl.push(ChatDetailsPage,{
      profil: profil,
      chatId : this.chatService.provideChatId(this.currentUserInformation.userId,profil.id)
    } );
    
  }
}
