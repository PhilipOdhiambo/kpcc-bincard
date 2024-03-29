import { Component } from '@angular/core';
import { DepartmentService } from './pages/deparmentModule/models/department.service';
import { InventoryTransferService } from './services/inventory-transfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'bincard-kpcc';

  constructor(
    private transfers:InventoryTransferService,
    private department: DepartmentService
    ) {

  }

}
