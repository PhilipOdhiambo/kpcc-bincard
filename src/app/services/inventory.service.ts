import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http'
import {Observable, Subject } from 'rxjs';
import { InventoryI } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  collection = "inventory";
  inventoryListObserver: Observable<any>

  inventory$: Observable<InventoryI[]>;
  localInventory$ = new Subject<InventoryI[]>();


  constructor(
    private db: AngularFirestore,
    private http:HttpClient
  ) {
    this.getInventory()


  }

  createInventory(invent: InventoryI) {
    const collectionRef = this.db.collection(this.collection).ref;
    let id = this.db.createId();
    invent.id = id;
    invent.modified = new Date(firebase.firestore.Timestamp.now().seconds * 1000)
    this.db.collection(this.collection).doc(id).set(invent);
  }


  uploadData() {
    let inventory1 = {
      medicine: []
    }

    this.http.get("assets/inventory.json").toPromise().then((docs:any[]) => {
      inventory1.medicine = [...docs];
      this.db.collection('inventory1').add(inventory1)
    });
    
  }

  getInventory() {
    this.db.collection('inventory1').valueChanges().subscribe((result:any) => {
      this.localInventory$.next([...result[0].medicine])
    })

  }


  editInventory(invent: InventoryI) {
    this.db.collection(this.collection).doc(invent.id).update(invent)
  }


  deleteInventory(id: string) {
    this.db.collection(this.collection).doc(id).delete()
      .then(resp => {
        console.log(resp);
      })
      .catch(err => console.log(err));
  }
  

}
