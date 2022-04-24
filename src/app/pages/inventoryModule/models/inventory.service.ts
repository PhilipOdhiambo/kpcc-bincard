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

    let url = "https://script.googleusercontent.com/macros/echo?user_content_key=HMvRLB-DRiAFowt4-NE8kDS65aCEi3rDrWWljCUteOKZ2K4cRwCv3zRqstVXeoq5hl2z5rYeKA6WALriwGO5OnMDcVVjRcglm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHTjiQwldAG31FzHGs2vk5yndjcnq4uxZVj1NCvpFlKAUVaNrZaUdsgwxxl5NhqYLlmcxRjQQJsK1h4QzP0JxzvHhLkSQ-hd0Nz9Jw9Md8uu&lib=MehCzhhTITJFRiRvW1rM9d2Qekg880Chk"
    this.http.get(url).subscribe((res:any) => {
      this.inventory = res
      this.inventory$.next([...res])
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


