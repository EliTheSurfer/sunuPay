import { ConsultantPipe } from './../pipe/consultantFilter';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { ProfilePage } from '../pages/profile/profile';
import { JobsPage } from '../pages/jobs/jobs';
import { TabsPage } from '../pages/tabs/tabs';
import { MyJobsPage } from '../pages/myjobs/myjobs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth-service';

/*YOU HAVE TO PUT YOUR APIKEY FROM YOUR FIREBASE COUNT*/

export const firebaseConfig = {
  apiKey: "AIzaSyDHDu0uQfuKVymByA3kgMQsc3SEyDW8S08",
  authDomain: "neolynker.firebaseapp.com",
  databaseURL: "https://neolynker.firebaseio.com",
  projectId: "neolynker",
  storageBucket: "neolynker.appspot.com",
  messagingSenderId: "488843974722"
};

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    ProfilePage,
    JobsPage,
    MyJobsPage,
    LoginPage,
    SignUpPage,
    ConsultantPipe,
    TabsPage,
    ProfileDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
    {
      backButtonText: 'retour',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }),

    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    ProfilePage,
    JobsPage,
    MyJobsPage,
    LoginPage,
    SignUpPage,
    ProfileDetailsPage,
    TabsPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
