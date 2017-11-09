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


export class ChatDetailsPage  implements AfterViewChecked{

  ngAfterViewChecked(): void {
    //Aller au message le plus recent directement
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
  active :boolean;
  

  

  constructor(public navCtrl: NavController, private currentUserInformation : userInformationService,public af: AngularFire, public navParams: NavParams) {

    //On crée un modele de message à envoyer
    this.messageToSend = new chatMessageModel();

    //On recupere l'id du chat dans lequel on est , c'est une variable de l'url de l'api REST
    this.chatId = navParams.get("chatId"); 

    //On recupere les informations sur le destinataire du message
    this.receiver = navParams.get("profil"); 

    //On recupere  les informations sur l'envoyeur du message
    this.sender = navParams.get("sender"); 

    //On situe les données de la conversation
    this.conversationReference = af.database.list('/chat/'+this.chatId); 
    this.ref = firebase.database().ref('/chat/'+this.chatId);    

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailsPage');
    this.active = true;    
    this.tagMessages(this.sender.id);
    
    
  }

  ionViewDidLeave() {
    this.active = false;        
  }

  /**
   * fonction qui permet marquer les messages comme etant lus
   * @param message message de log
   */
  tagMessages(receiverId : string ){

    let instance = this;
    //On marque les messages comme 'lu'
      this.ref.orderByValue().on('value', function(data: any) {
        data.forEach(function(snap: any) {
          //Si l'envoyeur du message n'est pas moi et qu'il n'est pas marqué lu
            if(snap.val().envoyeurId  !=  instance.currentUserInformation.userId  && snap.val().etat != 'lu' && instance.navCtrl.getActive().name ==='ChatDetailsPage' && instance.active == true){
              console.log("receiver : "+ receiverId);       
              console.log("chat id : " + instance.chatId);       
              console.log("receiver : " +instance.chatId.indexOf(receiverId) + " chatId : "+instance.chatId+ " receiver : "+receiverId);
              console.log("sender  : "+snap.val().envoyeurId + " " +snap.val().message );
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
