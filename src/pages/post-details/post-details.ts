import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';


/**
 * Generated class for the PostDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post-details',
  templateUrl: 'post-details.html',
})
export class PostDetailsPage {

  root:any;
  profil : any;
  textToPublish : any;
  

  constructor(public navCtrl: NavController,public element: ElementRef,private keyboard: Keyboard, public navParams: NavParams) {
    this.profil = navParams.get("writer");
    this.keyboard.show();    
    
  }
  ngOnInit(){
    this.root = this.element.nativeElement;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailsPage');
  }

  publish(){
    console.log(this.textToPublish);
    console.log(this.profil);
  }

}
