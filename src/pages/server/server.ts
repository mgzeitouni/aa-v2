import { Component, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { ovenSession } from '../../classes/ovenSession';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ServerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage  {

  sessions:ovenSession[] = [];
  store:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public firebaseProvider:FirebaseProvider,
  public storage: Storage) {


    this.storage.get('store').then((store)=>{
      this.store=store;
    })

    this.storage.set('date', new Date().getDate());

    this.subscribeToData();

    setInterval(x=>
      {
      this.updateTimeLeft();
      storage.get('date').then(val=>{
        if(new Date().getDate()!=val){
          this.subscribeToData();
          console.log('new day!, getting new data...')
        }
      })
      },1000)


  }

  ovenSessions$:FirebaseListObservable<ovenSession[]>

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerPage');

  }

  subscribeToData(){

    this.storage.get('store').then(val=>{

      this.ovenSessions$ = this.firebaseProvider.getOvenSessions();
      this.ovenSessions$.subscribe(sessions=>{
        
        this.sessions=[];
        sessions.map(session=>{

          if(session.product.company==val){
            this.sessions.push(session)
          }
        })
        this.updateTimeLeft();
      
      })
    })

  }


  updateTimeLeft(){    

    // First map the end time to a time left

   this.sessions.map(session=>{
      
    var ovenTimeSeconds = session.product.oven_time * 60000;

    var end_time = Number((new Date(session.start_time).getTime())) + ovenTimeSeconds;

    var time_left_seconds = (end_time-Number(new Date())) /1000;
    
    time_left_seconds < 0? time_left_seconds=0:''

    var minutes = Math.floor(time_left_seconds / 60).toString();
    
   
    (Number(minutes)<10) ? minutes = '0'+minutes:'';

    var seconds =Math.floor(time_left_seconds - Number(minutes) * 60).toString();
    
    (Number(seconds)<10) ? seconds = '0'+seconds:'';
  
    var formatted = minutes + ':' + seconds;
     
    session.time_left=formatted;
    })

    // Filter out those with 0 time left
    var filtered = this.sessions.filter((session)=>
      session.time_left !="00:00"

  )

 this.sessions=filtered

}


private timer;
private maxTime = 30;//get this from user input in the ionic time picker and convert it to seconds maybe.
timeLeft:string;
StartTimer() {
    this.timer = setTimeout(x => 
       {
           if(this.maxTime <= 0) {}
           this.maxTime -= 1;
           this.timeLeft = this.secondsToMinutes(this.maxTime)
           this.StartTimer();

       }, 1000);


}


calculateTime(session):any{
  var now = new Date();
  var ovenTime = session.product.ovenTimer;
  var end_time = new Date(session.start_time) + session.product.oven_time;
  return end_time
}

secondsToMinutes(seconds:number): string{
  const minutes: number = Math.floor(seconds / 60);
  return minutes + ':' + (seconds - minutes * 60);
}


}
