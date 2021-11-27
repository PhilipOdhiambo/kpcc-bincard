import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentI } from 'src/app/models/department.Interface';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  unitName;
  department;
  category;

  @Output() close = new EventEmitter<boolean>();

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {

  }

  addDepartmentClose() {
    this.close.emit(true);
  }

  submit(myform: NgForm) {
    const dept: DepartmentI = {
      unitName: myform.form.get("unitName").value,
      department: myform.form.get("department").value,
      category: myform.form.get("category").value,
    }
    if(myform.valid) {
      this.departmentService.createDepartment(dept);
      this.close.emit(true);
    }

  }

}
