import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DepartmentI } from '../models/department.Interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  collection = 'departments';

  departmentList =[]; 
  dept1:Observable<any>

  constructor(private db: AngularFirestore) { }

  createDepartment(dept:DepartmentI) {
    const collectionRef = this.db.collection(this.collection).ref;
    let id = this.db.createId();
    dept.unitId = id;
    collectionRef.doc(id).set(dept)
  }

   getDepartments() {

    const depts = new Observable((observer) => {
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
    return depts;
    }


  editDepartmet(dept:DepartmentI) {
    this.db.collection(this.collection).doc(dept.unitId).update(dept)
  }


  deleteDepartment(id:string) {
    this.db.collection(this.collection).doc(id).delete()
    .then(resp => {
      console.log(resp);
    })
    .catch(err => console.log(err));
  }


}
