import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../classes/product';

@IonicPage()
@Component({
  selector: 'page-baker',
  templateUrl: 'baker.html',
})
export class BakerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public firebaseProvider: FirebaseProvider) {

  }

  cardsPerRow:number=2;

  products: Product[];

  ionViewDidLoad() {
    console.log('ionViewDidLoad BakerPage');
    this.products = this.firebaseProvider.getProducts('Cinnabon')
       this.pairUpProducts();
    
  }

  pairUpProducts(){
    var productPairs= [];
    var object = [];

    for (let product of this.products){
      var index = this.products.indexOf(product);

      object.push(product);
      if( (index+1) % this.cardsPerRow == 0){

        productPairs.push(object);
        object =[];
      }else{

        if (index ==this.products.length-1){
          productPairs.push(object);
        }

      }

    }

    this.products = productPairs;
    console.log(productPairs);
  }

  addItem() {
    this.firebaseProvider.addItem('hey world');
  }
 
  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }

  


}
