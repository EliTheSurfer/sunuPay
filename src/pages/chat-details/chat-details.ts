import { userInformationService } from './../../providers/userInformation-service';
import { chatMessageModel } from './../../models/chatMessageModel';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'firebase';


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


export class ChatDetailsPage  implements AfterViewChecked, OnInit{

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  textToPublish : "";
  conversationReference : FirebaseListObservable<any[]>;
  chatId : string;
  messageToSend : chatMessageModel;
  sender : any;
  receiver : any;
  ref : any;
  

  

  constructor(public navCtrl: NavController, private currentUserInformation : userInformationService,public af: AngularFire, public navParams: NavParams) {

    this.messageToSend = new chatMessageModel();
    this.chatId = navParams.get("chatId"); 
    this.receiver = navParams.get("profil"); 
    this.sender = navParams.get("sender"); 

  
    this.conversationReference = af.database.list('/chat/'+this.chatId); 
    this.ref = firebase.database().ref('/chat/'+this.chatId);    

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //Si les messages sont chargés on les marque comme lu
    this.tagMessages('constructeur');
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailsPage');
        
    
  }

  /**
   * fonction qui permet marquer les messages comme etant lus
   * @param message message de log
   */
  tagMessages(message : string ){

    let instance = this;
    //On marque les messages comme 'lu'
    console.log(message + " "+ instance.currentUserInformation.userId);   
      this.ref.orderByValue().on('value', function(data: any) {
        data.forEach(function(snap: any) {
            if(snap.val().envoyeurId  !=  instance.currentUserInformation.userId  && snap.val().etat != 'lu' && instance.navCtrl.getActive().name ==='ChatDetailsPage'){
              console.log(snap.val().envoyeurId + " " +snap.val().message );
              instance.conversationReference.update(snap.getKey(),{etat : 'lu'});            
            }
        });
      });
    }

  /**
   * fonction qui permet de d'envoyer un message en fonction des informations rentrées par l'utilisateur
   */
  sendMessage(){

    this.messageToSend.setDate(new Date().toLocaleString());
    this.messageToSend.setMessage(this.textToPublish);
    this.messageToSend.setEnvoyeurId(this.sender.id);
    this.messageToSend.setRecepeteurId(this.receiver.id);
    this.messageToSend.setPhoto(this.sender.photoDeProfil);
    this.messageToSend.setEnvoyeurNomComplet(this.sender.prenoms+ " "+ this.sender.nom);
    this.messageToSend.setEtat("envoyé");
    this.conversationReference.push(this.messageToSend);
    this.textToPublish="";    

    
  }


  /**
   * fonction d'auto-scroll
   */
  scrollToBottom(): void {
    // method used to enable scrolling
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
}
  

}
