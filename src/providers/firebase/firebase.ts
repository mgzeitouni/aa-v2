import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../classes/product';
import {Observable} from 'rxjs/Observable';
import { ovenSession } from '../../classes/ovenSession';
 
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

  
  addOvenSession(session: ovenSession){

    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

  this.afd.list('/ovenSessions/'+date+'/').push(session);
 
  //   this.afd.object('/ovenSessions/'+date+'/'+newId).subscribe(doc=>{
  //    // doc.update({newId,doc}).then(_ => console.log('update!'));
  //    this.afd.object('/ovenSessions/'+date+'/'+newId).update(doc);
  //  // console.log(doc);
  // })
  }
  getAllProducts(){

    return this.afd.list('/Products/');
    
  }

  filterProducts(products, company){

    var filteredProduct=[];
    for (let product of products){
      if (product.company==company){
        filteredProduct.push(product)
      }
    }

    return filteredProduct
  }

  getOvenSessions():FirebaseListObservable<ovenSession[]>{
    
    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

    return this.afd.list('/ovenSessions/'+date+'/', {
      query:{
        orderByChild: 'end_time',
        startAt: d.getTime()
      }

    });
  }

  removeSession(session){

    var d = new Date();
    var date= d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear();

    session.deleted=true;
    console.log(this.afd.object('/ovenSessions/'+date+'/'+session.$key).update(session));

      
  }


}
