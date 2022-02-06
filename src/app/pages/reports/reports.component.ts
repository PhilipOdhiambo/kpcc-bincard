import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';
import { Issue, Receipt } from '../../models/types';
import * as XLSX from 'xlsx';  // To export the report to excel
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';
import { InventoryTransferI, TransferDetailI } from 'src/app/models/inventory-transfer.interface';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('month_start') month_start: ElementRef;
  @ViewChild('month_end') month_end: ElementRef;
  @ViewChild('year') year: ElementRef;

  transfers = []
  transfers$: Subject<any> = new Subject()
  date = new Date()

  // Subscriptions

  transferSub: Subscription = new Subscription()

  downloadLink: string

  filteredReceipts: Array<Receipt> = [];
  filteredIssues: Array<Issue> = [];
  reportToShow = [];

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  constructor(
    private inventoryTransferService: InventoryTransferService,
    private router: Router, private activeRoute: ActivatedRoute,
  ) {
  }




  get getReportToShow() {
    return this.reportToShow;
  }

  ngOnInit(): void {


  }


  getInventoryTransfers() {
    let year = (this.year.nativeElement as HTMLSelectElement).value;
    let start_month = (this.month_start.nativeElement as HTMLSelectElement).value;
    let end_month = (this.month_end.nativeElement as HTMLSelectElement).value;
    let startInput = year + "-" + start_month;
    let endInput = year + "-" + end_month;
    this.transferSub.unsubscribe();
    this.transferSub = this.inventoryTransferService.read(startInput, endInput).subscribe((res: any[]) => {

    let data = []
    if (!res.length) {
      alert ("No data exist in given range");
      this.transfers = [];
      return;
    }
    res.forEach((range: any) => {
      range.data.forEach((order: InventoryTransferI) => {
        order.items.forEach((item: TransferDetailI) => {
          data.push({
            from: order.departmentOrdering,
            to: order.departmentIssuing,
            docRef: "S11. " + order.orderNumber,
            item: item.description,
            qtyOrdered: item.qtyOrdered,
            qtyIssued: item.qtyIssued,
            cost: item.cost
          })
        })
      });
    })
      this.transfers = data;
    })
  }


  ngAfterViewInit() {

  }
  ngOnDestroy() {
    this.transferSub.unsubscribe()
  }

  /* Custom Functions */

  // Cancel page
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }


  onDownloadClick() {
    /* Download report to xlsx */ 
    let header = [{
      from: "Ordering", to: "Issuing", docRef: "S11 No.",
      item: "Item Description", qtyOrdered: "Ordered", qtyIssued: "Issued", cost: "Unit Cost"
    }];

    const workbook = XLSX.utils.book_new(); // Create a new workbook
    // Create sheet with headers, add data and append to workbook
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(this.transfers), 'sheet1');
    const blob = new Blob([XLSX.writeFile(workbook,"report.xlsx")],{type: "xlsx"});
    this.downloadLink = URL.createObjectURL(blob)
  }

}
