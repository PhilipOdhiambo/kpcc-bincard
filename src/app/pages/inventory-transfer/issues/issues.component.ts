
// Title: AddIssue Componet
// Purpose: To enable adding of a new issue to the database

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { InventoryTransferI } from 'src/app/models/inventory-transfer.interface';
import { InventoryTransfer } from 'src/app/models/inventory-transfer.model';
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';

@Component({
  selector: 'issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit, AfterViewInit {
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];


  @ViewChild("year") year: ElementRef;
  @ViewChild("month") month: ElementRef;
  subscription = new Subscription();
  date = new Date();
  order$: InventoryTransferI[] = [];
  currentDocId:string;
  firebaseData:InventoryTransferI[] = []
  orderIndex:number;

  constructor(
    private transfers: InventoryTransferService,
    ) {
  
   }

  read() {
    this.subscription.unsubscribe()
    let year = (this.year.nativeElement as HTMLSelectElement).value
    let month = (this.month.nativeElement as HTMLSelectElement).value
    this.currentDocId = year + "-" + month;
    this.subscription = this.transfers.read(this.currentDocId, this.currentDocId).subscribe((result: any) => {
      if (result.length === 0) {
        this.order$ = [];
        this.orderIndex = null;        
        return
      }
      this.firebaseData = result[0].data;
      this.order$ = result[0].data.map((order:InventoryTransferI) => {
        let newInvent = new InventoryTransfer();
        newInvent.issueBy = order.issueBy;
        newInvent.departmentOrdering = order.departmentOrdering;
        newInvent.departmentIssuing = order.departmentIssuing;
        newInvent.items = order.items;
        newInvent.orderNumber = order.orderNumber
        return newInvent;
      } );
      this.orderIndex = null;
    });
  }

  save(event:any) {
    const update = (event.value as InventoryTransferI)
    this.firebaseData[this.orderIndex] = {...this.firebaseData[this.orderIndex], ...update};
    this.transfers.update(this.currentDocId, {data:this.firebaseData})
    this.orderIndex = null;
   
  }

  clickOrder(index:number) {
    this.orderIndex = index;
  }


  ngOnInit(): void {


  }
  ngAfterViewInit() {
    this.read();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
