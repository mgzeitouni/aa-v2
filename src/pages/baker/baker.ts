import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';

@IonicPage()
@Component({
  selector: 'page-baker',
  templateUrl: 'baker.html',
})
export class BakerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseProvider: FirebaseProvider) {
   // this.shoppingItems = this.firebaseProvider.getShoppingItems();
 this.firebaseProvider.getProducts('Ca');
  }

  newItem = '';

  collection: AngularFirestoreCollection<any>;
//  collection$: Observable<any> = this.collection.valueChanges();

  ionViewDidLoad() {
    console.log('ionViewDidLoad BakerPage');
  }

  addItem() {
    this.firebaseProvider.addItem('hey world');
  }
 
  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }

  


}
