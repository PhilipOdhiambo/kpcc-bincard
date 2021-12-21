import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class InventoryTransferService {


  collection = 'inventory-transfers';


  constructor(private fs:AngularFirestore) {
  }


  intitializeIntentoryTransfers() {

  }


  createTransfer() {
    
  }
}
