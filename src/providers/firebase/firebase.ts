import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../../classes/product';
 
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor( public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  getShoppingItems() {
    return this.afd.list('/shoppingItems/');
  }
  
  addOvenSession(product: Product){
    this.afd.list('ovenSessions').push(product);
  }

  getProducts(company: string): Product[]{
    var response = [];
    this.afd.list('/Products/').subscribe(products=>{
      for (let product of products){
        if (product.company==company){
          response.push(product)
        }
      }
      return response;
     })


  }

  addItem(name) {
    this.afd.list('/shoppingItems/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }

}
