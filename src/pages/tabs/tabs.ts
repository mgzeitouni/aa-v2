import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BakerPage } from '../baker/baker';
import { ServerPage } from '../server/server';
import { Storage } from '@ionic/storage';
import { ChoosestorePage } from '../choosestore/choosestore';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root=BakerPage;
  tab2Root=ServerPage;
  
  constructor(public nav: NavController, 
    public navParams: NavParams,
    public storageService:Storage,
    public viewCtrl: ViewController) {

}

ionViewWillEnter() {

 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
