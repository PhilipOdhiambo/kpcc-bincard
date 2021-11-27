import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InventoryI } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  collection = "inventory";
  inventoryList:Array<any> = []


  constructor(
    private db:AngularFirestore
  ) { }


  createInventory(invent:InventoryI) {
    const collectionRef = this.db.collection(this.collection).ref;
    let id = this.db.createId();
    invent.id = id;
    collectionRef.doc(id).set(invent)
  }


   getInventory() {
    const inventory = new Observable((observer) => {
      let data = [];
      this.db.collection(this.collection).snapshotChanges()
      .subscribe(querySnapshot => {
        const temp = [];
        querySnapshot.map(doc => {
         temp.push(doc.payload.doc.data());
        });
        data = temp;
        observer.next(data)      
      });
    })
    return inventory;
    }

  getInventoryg() {
    this.db.collection(this.collection).snapshotChanges()
    .subscribe(querySnapshot => {
      const temp = [];
      querySnapshot.map(doc => {
       temp.push(doc.payload.doc.data());
      });
      this.inventoryList = temp;     
    });

  }


  editInventory(invent:InventoryI) {
    this.db.collection(this.collection).doc(invent.id).update(invent)
  }


  deleteInventory(id:string) {
    this.db.collection(this.collection).doc(id).delete()
    .then(resp => {
      console.log(resp);
    })
    .catch(err => console.log(err));
  }

}
