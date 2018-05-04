import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BakerPage } from '../pages/baker/baker';
import { ServerPage } from '../pages/server/server';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { ChoosestorePage } from '../pages/choosestore/choosestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCcW9VRqCQ_YUAuSYDp35IUYohThdBz2CI",
  authDomain: "auntie-anns.firebaseapp.com",
  databaseURL: "https://auntie-anns.firebaseio.com",
  projectId: "auntie-anns",
  storageBucket: "auntie-anns.appspot.com",
  messagingSenderId: "567028472447",

};

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    BakerPage,
    ServerPage,
    TabsPage,
    ChoosestorePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    BakerPage,
    ServerPage,
    TabsPage,
    ChoosestorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
     IonicStorageModule,
     HttpClient,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    FirebaseProvider
  ]
})
export class AppModule {}
