
// Title: BincardService Class.

// Description: To link the bincard with database.
// Defines CRUD methods for both the receipComponet and IssueComponent and their Children.

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Drug} from './types';

@Injectable({
  providedIn: 'root'
})
export class BincardService {

  constructor(private db: AngularFirestore) {
    this.db.collection('retrievals').valueChanges().subscribe(e => {
      console.log(e)
    })
   }

  // Create Operations

  // Ref to receipts collection
  get receiptColRef() {
    return this.db.collection('receipts');
  }

  // Ref to issues collection
  get issueColRef() {
    return this.db.collection('issues');
  }

  // Ref to retrieval collection
  get retrievalRef() {
    return this.db.collection('retrievals')
  }

  addItem(item:Drug) {
    this.db.collection('items').add(item);
  }


  /* Read operations */

  // Read from receipts collection
  get receipts() {
    return this.db.collection('receipts').valueChanges();
  }

  // Read from issues collection
  get issues () {
    return this.db.collection('issues').valueChanges();
  }

  // Read items from collection
  get items() {
    return this.db.collection('items').valueChanges();
    } 


  /* Update Operations */

  // Update a Receipt in the receipts collection
  updateItem(Id) {
  }

    // Update an Issue in the issues collection
  updateIssue(Id) {
  }

  
  
/* Delete Operations */

  //

 
}

