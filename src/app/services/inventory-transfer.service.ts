import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { InventoryTransferI } from '../models/inventory-transfer.interface';


@Injectable({
  providedIn: 'root'
})
export class InventoryTransferService {


  collection = 'inventory-transfers';


  constructor(private fsDb: AngularFirestore) {
  }


  createTransfer(transfer: InventoryTransferI) {
    transfer.orderTime = new Date()
    let yearMonth = transfer.orderTime.getFullYear().toString() + "-" + (transfer.orderTime.getMonth() + 1).toString()
    let fsTransfer = { data: [] }
    let fsDocument: AngularFirestoreDocument = this.fsDb.collection(this.collection).doc(yearMonth);
    return fsDocument.get().toPromise().then(doc => {
      if (doc.exists) {
        let existingData: InventoryTransferI[] = doc.data().data;
        existingData.push(transfer);
        fsTransfer.data = existingData
        fsDocument.set(fsTransfer).then(success => console.log("Transfer added"))
      } else {
        fsTransfer.data.push(transfer)
        fsDocument.set(fsTransfer).then(e => console.log("Initial Transer set"))
      }
    })
  }

  update(id: string, data: any) {
    this.fsDb.collection(this.collection).doc(id).update(data)
  }


  read(start: string, end: string) {
    return this.fsDb.collection(this.collection, ref => {
      return ref.where(firebase.firestore.FieldPath.documentId(), '>=', start)
        .where(firebase.firestore.FieldPath.documentId(), '<=', end);
    }).valueChanges()
  }




}
