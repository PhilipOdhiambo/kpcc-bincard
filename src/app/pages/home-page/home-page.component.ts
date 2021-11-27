import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private departmentServie:DepartmentService) { }

  ngOnInit(): void {
    //this.departmentServie.createDepartment();
  }

}