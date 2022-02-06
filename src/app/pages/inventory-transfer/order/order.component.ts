
// Title: AddReceipt Componet
// Purpose: To enable adding of a new receipt to the database

import { Component, OnInit,AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment'; // monent is a library to handle time
import { Subscription } from 'rxjs';
import { TransferDetailI } from 'src/app/models/inventory-transfer.interface';
import { InventoryI } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';
import { DepartmentI } from 'src/app/models/department.Interface';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'receipts',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class ReceiptsComponent implements OnInit, AfterViewInit {

  @ViewChild('dept') dept: ElementRef;
  @ViewChild('drugSearch') drugSearch: ElementRef;
  @ViewChildren('qty') qtyArr: QueryList<ElementRef>;


  private qtySubsc: Subscription = new Subscription();
  filteredDepartments?: DepartmentI[] = [];
  filteredDrugs?: InventoryI[] = [];
  myForm: FormGroup;
  myFormDetail: FormArray;
  receiptDetail: TransferDetailI[];
  doc: Document

  constructor(
    private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,
    private inventoryTranserService: InventoryTransferService,
    private inventoryService: InventoryService,
    private departmentService: DepartmentService,
    private elRef: ElementRef
  ) {
    this.receiptDetail = []
    this.doc = (this.elRef.nativeElement as Document)

  }

  spliceTransferDetail(index: number) {
    this.receiptDetail.splice(index, 1)
  }


  calculateLineValue(row: FormGroup) {
    row.get('value').setValue(
      (parseFloat(row.get('qtyOrdered').value) * parseFloat(row.get('cost').value)).toFixed(2)
    )
  }


  ngOnInit(): void {

    /* Declare and Initialize reactive form */
    this.myForm = this.fb.group({
      departmentOrdering: ['', Validators.required], departmentIssuing: ['', Validators.required],
      stockIssuedFromBuffer: true, stockReceivedToBuffer: true, orderBy: '',
      orderTime: [moment(new Date()).format('YYYY-MM-DD'), Validators.required], approveBy: '', approveTime: '', issueBy: '',
      issueTime: '', receiveBy: '', receiveTime: '',
      orderNumber: ['', Validators.required],
      items: this.fb.array([])
    });
    this.departmentService.department$.subscribe(res => this.filteredDepartments = res)
  }
  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.qtySubsc.unsubscribe;
  }


  // Filter Departments and add the selected department
  filterDepartments(str: string) {
    this.filteredDepartments = this.departmentService.filterDepartments(str)
  }


  // When a department is selected from the dropdown
  departmentOrdering(department) {
    this.myForm.get('departmentOrdering').setValue(department);
    this.filteredDepartments = [];
  }

  departmentIssuing(department) {
    this.myForm.get('departmentIssuing').setValue(department);
    this.filteredDepartments = [];
  }

  onClickOutDeptInput() {
    this.filteredDepartments = [];
    (this.dept.nativeElement as HTMLInputElement).value = '';
  }



  filterDrugs(str: string) {
    this.filteredDrugs = this.inventoryService.filterInventory(str)
  }

  onClickOutDrugInput() {
    this.filteredDrugs = [];
    (this.drugSearch.nativeElement as HTMLInputElement).value = ''
  }

  onClickInDrugInput() {
    if (this.filteredDrugs) {
      this.filteredDrugs = this.inventoryService.filterInventory('')
    }

  }

  // Cancel page
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }


  // Add drugs to the detail section of the form
  onDrugClick(drug: InventoryI, drugSearch: HTMLInputElement) {
    (this.myForm.get('items') as FormArray).push(this.fb.group({
      code: drug.code, cost: drug.buying, description: drug.description,
      qtyOrdered: ['', Validators.required],
      qtyIssued: '', remarks: '', value: drug.buying
    }));


    setTimeout(() => {
      this.filteredDrugs = [];
      (this.qtyArr.last.nativeElement as HTMLInputElement).focus()
    }, 0);
  }

  removeDetailRow(index) {
    (this.myForm.controls['items'] as FormArray).removeAt(index)
  }

  // Clear form
  clearForm() {
    if (confirm("This action will Delete your work")) {
      this.myForm.reset();
    } else {
      return
    }
  }

  // Saving form information
  saveForm() {
    this.receiptDetail.forEach(detail => {
      (this.myForm.controls['items'] as FormArray).push(this.fb.group(detail))
    })
    if (this.myForm.valid && (this.myForm.controls['items'] as FormArray).length > 0) {
      this.inventoryTranserService.createTransfer(this.myForm.value).then(res => {
        (this.myForm.controls['items'] as FormArray).clear();
        this.myForm.reset();
      });

    } else {
      // invalid
      return
    }
  }
}
