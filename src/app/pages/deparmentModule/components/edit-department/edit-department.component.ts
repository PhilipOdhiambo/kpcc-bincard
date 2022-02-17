import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentI } from 'src/app/models/department.Interface';
import { DepartmentService } from '../../models/department.service';

@Component({
  selector: 'edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  unitName;
  department;
  category;

  @Input('unit') unit:DepartmentI;

  @Output() close = new EventEmitter<boolean>();

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.unitName = this.unit.unitName;
    this.category = this.unit.category;
    this.department = this.unit.department;
  }

  editDepartmentClose() {
    this.close.emit(true);
  }

  submit(myform: NgForm){
    const dept: DepartmentI = {
      unitId: this.unit.unitId,
      unitName: myform.form.get("unitName").value,
      department: myform.form.get("department").value,
      category: myform.form.get("category").value,
    }
    if(myform.valid) {
      this.departmentService.editDepartmet(dept);
      this.close.emit(true);
    }
  }


}
