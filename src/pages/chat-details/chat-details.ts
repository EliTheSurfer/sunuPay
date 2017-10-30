import { userInformationService } from './../../providers/userInformation-service';
import { chatMessageModel } from './../../models/chatMessageModel';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the ChatDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-details',
  templateUrl: 'chat-details.html'
})


export class ChatDetailsPage  implements AfterViewChecked{
  
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

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

  scrollToBottom(): void {
    // method used to enable scrolling
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
}
  

}
