import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription, Subject } from 'rxjs';
import { Issue, Receipt } from '../../models/types';
import * as XLSX from 'xlsx';  // To export the report to excel
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';
import { InventoryTransferI, TransferDetailI } from 'src/app/models/inventory-transfer.interface';
import { DepartmentI } from 'src/app/models/department.Interface';
import { DepartmentService } from '../deparmentModule/models/department.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('month') month: ElementRef;
  @ViewChild('year') year: ElementRef;
  @ViewChild('departmentReporting') departmentReporting: ElementRef;
  @ViewChild('reportOn') reportOn: ElementRef;

  reportType = ''

  transfers = []
  transfers$: Subject<any> = new Subject()
  departments: DepartmentI [] = []
  date = new Date()

  // Subscriptions
  transferSub: Subscription = new Subscription()
  downloadLink: string
  filteredReceipts: Array<Receipt> = [];
  filteredIssues: Array<Issue> = [];

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  constructor(
    private inventoryTransferService: InventoryTransferService,
    private deparmentService: DepartmentService,
    private router: Router, private activeRoute: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.deparmentService.department$.subscribe(departments => this.departments = departments);
  }


  getInventoryTransfers() {
    let year = (this.year.nativeElement as HTMLSelectElement).value;
    let month = (this.month.nativeElement as HTMLSelectElement).value;
    let period = year + "-" + month;
    this.transferSub.unsubscribe();
    this.transferSub = this.inventoryTransferService.read(period, period).subscribe((res: any[]) => {

    let data = []
    if (!res.length) {
      alert ("No data exist in given range");
      this.transfers = [];
      return;
    }
    this.reportType = (this.reportOn.nativeElement as HTMLSelectElement).value
    res.forEach((range: any) => {
      range.data.forEach((order: InventoryTransferI) => {
        order.items.forEach((item: TransferDetailI) => {
          let temp:any = {
            "Department Ordering": order.departmentOrdering,
            "Department Issuing": order.departmentIssuing,
            "S11 No.": order.orderNumber,
            item: item.description,
            cost: parseFloat(parseFloat(item.cost).toFixed(2)),
            quantity: parseInt(item.qtyOrdered),
            date: order.orderTime         
          }
          temp.total = parseFloat((temp.cost * temp.quantity).toFixed(2))
          data.push(temp)
        })
      });
    })
      this.transfers = data;
    })
  }


  getReceipts() {
    let departmentReporting = this.departmentReporting.nativeElement.value
    return this.transfers
    .filter(transfer => transfer['Department Ordering'] == departmentReporting ) 
  }

  getIssues() {
    let departmentReporting = this.departmentReporting.nativeElement.value
    return this.transfers
    .filter(transfer => transfer['Department Issuing'] == departmentReporting )
  }

  getRetrievals(){
    return this.transfers
    .filter(transfer => transfer['Department Ordering'] == transfer['Department Issuing'])
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
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    // Create sheet with headers, add data and append to workbook
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(this.transfers), 'sheet1');
    const blob = new Blob([XLSX.writeFile(workbook,"report.xlsx")],{type: "xlsx"});
    this.downloadLink = URL.createObjectURL(blob)
  }

}
