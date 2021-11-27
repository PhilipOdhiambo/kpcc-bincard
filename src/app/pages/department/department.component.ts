import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentI } from 'src/app/models/department.Interface';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  addDepartment = false;
  editDepartment = false;
  deleteDepartment = false;
  departmentList$:Observable<any>;
  activatedUnit:DepartmentI;


  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
     this.departmentList$ = this.departmentService.getDepartments()
 
  }


  toggleAddDepartment():void {
    this.addDepartment = !this.addDepartment;
  }

  toggleEditDepartment():void {
    this.editDepartment = !this.editDepartment;
  }


  toggleDeleteDepartment():void {
    this.deleteDepartment = !this.deleteDepartment;
  }

  deleteResource(deleteData:boolean) {
    if(deleteData) {
      this.departmentService.deleteDepartment(this.activatedUnit.unitId)
    }
    this.deleteDepartment = false;
  }


  addDepartmentClosed(result:boolean) {

  }


  


}
