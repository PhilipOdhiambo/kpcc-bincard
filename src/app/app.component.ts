import { Component } from '@angular/core';
import { DepartmentService } from './services/department.service';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'bincard-kpcc';

  constructor(
    private departmentService: DepartmentService,
    private inventoryService: InventoryService
  ) {

    this.fetchDepartments();
    this.fetchInventory();
  }



 fetchDepartments(){
   this.departmentService.getDepartments();
 }


 fetchInventory () {
   this.inventoryService.getInventory().subscribe((list:Array<any>) => {
   })
 }
}
