import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import { DepartmentI } from '../models/department.Interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  collection = 'departments';
   department$ = new Subject<DepartmentI[]>();
   department:DepartmentI[];


  constructor(private db: AngularFirestore) {
    this.getDepartments()
  }


  createDepartment(dept:DepartmentI) {
    let id = this.db.createId();
    dept.unitId = id;  
    this.db.collection(this.collection).doc('document').update({
      data:firebase.firestore.FieldValue.arrayUnion(dept)
    })
  }


   getDepartments() {
    this.db.collection(this.collection).valueChanges()
    .subscribe((result:any) => {
      this.department$.next([...result[0].data])
      this.department = result[0].data;         
    });
    }


  editDepartmet(dept:DepartmentI) {
    this.db.collection(this.collection).doc('document').get().toPromise()
    .then((snapshot: any) => {
      let docs: any[] = snapshot.data().data;
      let index = docs.findIndex(x => x.unitId == dept.unitId);
      if (index > -1) {
        docs[index] = dept
        this.db.collection(this.collection).doc('document').update({ data: docs })
      } else {
        console.log('Department does not exist')
      }
    })
  }


  deleteDepartment(id:string) {
    this.db.collection(this.collection).doc('document').get().toPromise()
      .then((snapshot: any) => {
        let docs:DepartmentI[] = snapshot.data().data;
        let index = docs.findIndex(x => x.unitId == id);
        if (index > -1) {
          docs.splice(index, 1);
          this.db.collection(this.collection).doc('document').update({ data: docs })
        } else {
          console.log('Department does not exist')
        }
      })
  }
}
