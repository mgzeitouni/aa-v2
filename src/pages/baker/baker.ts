import { Component, ElementRef, Renderer, Directive } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../classes/product';
import { Storage } from '@ionic/storage';
import { ovenSession } from '../../classes/ovenSession';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-baker',
  templateUrl: 'baker.html',
})
export class BakerPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public firebaseProvider: FirebaseProvider,
  public storage:Storage,
  private alertCtrl: AlertController) {

  }

  cardsPerRow:number=2;

  products: Product[];
  store:string;
  selectedProduct: Product;
  quantity:number;

  ionViewDidLoad() {
    console.log('ionViewDidLoad BakerPage');

    this.storage.get('store').then((store) =>{
        this.store=store;
      this.firebaseProvider.getAllProducts().subscribe(allProducts=>{

        this.products = this.firebaseProvider.filterProducts(allProducts, store);

        this.pairUpProducts();
        
      })
    })

  }

  startOven(){
    const date = new Date();
    var end_time = date.getTime()+(this.selectedProduct.oven_time*60000);
    var session = new ovenSession(this.selectedProduct,  
      date.toString(),
       this.quantity,
       "",
       end_time)
    this.firebaseProvider.addOvenSession(session);

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

  }


  presentPrompt() {
    let alert=this.alertCtrl.create({
      title: 'Choose quantity',
      inputs: [

        {
          name: 'Quantity',
          placeholder: 'Quantity',
          type: 'tel',
          id:'autofocus'
        }
      ],
      cssClass: 'popUp',
      buttons: [
        {
          text: 'Start Oven',
          handler: data => {
            this.quantity=data;
          this.startOven();
          }
        }
      ]
    })

    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      console.log(firstInput)
      firstInput.focus();
      return;
    });


  }



}
