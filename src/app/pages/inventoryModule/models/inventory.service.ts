import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http'
import {Subject} from 'rxjs';
import { InventoryI } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  collection = "inventory";
  inventory$ = new Subject<InventoryI[]>()
  inventory: InventoryI[];


  constructor(
    private db: AngularFirestore,
    private http: HttpClient
  ) {
    this.getInventory()
    //this.initialDataUpload()
  }

  initialDataUpload() {
    this.http.get("assets/inventory1.json").toPromise().then((docs: any[]) => {
      let medicine = [...docs];
      this.db.collection(this.collection).doc('medicine').set({ data: medicine })
    });
  }


  createInventory(inventory: InventoryI) {
    const collectionRef = this.db.collection(this.collection).ref;
    let id = this.db.createId();
    inventory.id = id;
    this.db.collection(this.collection).doc('medicine').update({
      data: firebase.firestore.FieldValue.arrayUnion(inventory),
    });
  }


  getInventory() {
    this.db.collection(this.collection).valueChanges().subscribe((result: any) => {
      this.inventory$.next([...result[0].data])
      this.inventory = result[0].data;
    })
  }


  filterInventory(str: string): InventoryI[] {
    let regex = new RegExp(str, "i");
    return this.inventory?.filter(item =>
      regex.test(item.code) || regex.test(item.description));
  }


  editInventory(inventory: InventoryI) {
    this.db.collection(this.collection).doc('medicine').get().toPromise()
      .then((snapshot: any) => {
        let docs: any[] = snapshot.data().data;
        let index = docs.findIndex(x => x.id == inventory.id);
        if (index > -1) {
          docs[index] = inventory
          this.db.collection(this.collection).doc('medicine').update({ data: docs })
        } else {
          console.log('item does not exist')
        }
      })
  }


  deleteInventory(id: string) {
    this.db.collection(this.collection).doc('medicine').get().toPromise()
      .then((snapshot: any) => {
        let docs: any[] = snapshot.data().data;
        let index = docs.findIndex(x => x.id == id);
        if (index > -1) {
          docs.splice(index, 1);
          this.db.collection(this.collection).doc('medicine').update({ data: docs })
        } else {
          console.log('item does not exist')
        }
      })
  }
}


