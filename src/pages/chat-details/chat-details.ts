import { userInformationService } from './../../providers/userInformation-service';
import { chatMessageModel } from './../../models/chatMessageModel';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-details',
  templateUrl: 'chat-details.html',
})


export class ChatDetailsPage {

  textToPublish : "";
  conversationReference : FirebaseListObservable<any[]>;
  chatId : string;
  messageToSend : chatMessageModel;
  receiver : any;

  

  constructor(public navCtrl: NavController, private currentUserInformation : userInformationService,af: AngularFire, public navParams: NavParams) {

    this.messageToSend = new chatMessageModel();
    this.chatId = navParams.get("chatId"); 
    this.receiver = navParams.get("profil"); 
    
    this.conversationReference = af.database.list('/chat/'+this.chatId);  
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailsPage');
  }

  sendMessage(){

    this.messageToSend.setDate(new Date().toLocaleString());
    this.messageToSend.setMessage(this.textToPublish);
    this.conversationReference.push(this.messageToSend);
    this.textToPublish="";
    
  }

}
