import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { BakerPage } from '../pages/baker/baker';
import { ServerPage } from '../pages/server/server';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { ChoosestorePage } from '../pages/choosestore/choosestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;

  tab1Root = BakerPage;
  tab2Root = ServerPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  private storage: Storage) {
    this.initializeApp();

    this.storage.get('store').then((val) => {
      if(val === null){
        console.log('No store chosen');
        
        this.rootPage = ChoosestorePage;
      }else{
        console.log('Your store is ' + val);
        this.rootPage = TabsPage;
      }
  });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  chooseStore(store){

      this.storage.set("store",store);
      console.log("new store - "+store)
    this.nav.setRoot(TabsPage);

  }
}
