import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  collection = 'departments';

  constructor(private db: AngularFirestore) { }

  createDepartment() {
    const collectionRef = this.db.collection(this.collection).ref;
    let departmentId = this.db.createId();
    let department = new Department("Test Departmet",departmentId,"desc");
    collectionRef.doc(departmentId).set({
      departmentId:departmentId,
      departmentName: "Test department Name",
      departmentDescription: "Details of the department"
    }).then(res => {
      console.log(res);
    })
  }

  getDepartments() {
    return this.db.collection(this.collection).valueChanges();
  }

  getDepartmentById(id:string) {
    this.db.collection(this.collection).doc(id);
  }
}
