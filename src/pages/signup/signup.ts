import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage implements OnInit{
  root:any;
  error:any;
  loading:any;


  constructor(public navCtrl: NavController,public auth: AuthService,public af: AngularFire, public element: ElementRef, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    window.localStorage.removeItem('user');
    //this.tabBarElement = document.querySelector('.tabbar');
    this.element.nativeElement
  }

 presentLoading() {
    this.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Please wait...',
      duration: 8000,
      dismissOnPageChange: true
    }).present();
  }

  onSubmit(formData) {
    let loading = this.loadingCtrl.create({
          content: '<ion-spinner name="crescent"></ion-spinner> Please wait...',
          duration: 4000,
          dismissOnPageChange: true
        }).present();
    console.log(formData.value.password +' and '+ formData.value.repeatpassword);
    if(formData.valid && formData.value.password == formData.value.repeatpassword) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log(success);
       
        this.alertCtrl.create({
        title: 'Register Ok',
        subTitle: 'In feew seconds you will recive the confirmation email',
        buttons: ['Ok']
      }).present();
        this.navCtrl.push(LoginPage);
      }).catch(
        (err) => {
        console.log(err);
        this.alertCtrl.create({
          title: 'Register failed',
          subTitle: 'The email address is already in use by another account.',
          buttons: ['Ok']
        }).present();
        this.error = err;
      })
    }else{
      this.alertCtrl.create({
        title: 'Register failed',
        subTitle: 'Passwords are not iquals',
        buttons: ['Ok']
      }).present();
    }
  }

 ngOnInit(){
 }

 public goLogin() {
     this.navCtrl.push(LoginPage);
  }

}
