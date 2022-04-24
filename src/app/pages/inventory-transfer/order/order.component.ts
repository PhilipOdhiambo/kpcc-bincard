
// Title: AddReceipt Componet
// Purpose: To enable adding of a new receipt to the database

import { Component, OnInit,AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransferDetailI } from 'src/app/models/inventory-transfer.interface';
import { InventoryI } from 'src/app/pages/inventoryModule/models/inventory';
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';
import { DepartmentI } from 'src/app/models/department.Interface';
import { InventoryService } from '../../inventoryModule/models/inventory.service';
import { DepartmentService } from '../../deparmentModule/models/department.service';
import * as jquery from 'jquery';
import * as select2 from 'select2';



@Component({
  selector: 'receipts',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class ReceiptsComponent implements OnInit, AfterViewInit {

  @ViewChildren('qty') qtyArr: QueryList<ElementRef>;

  private qtySubsc: Subscription = new Subscription();
  departments:DepartmentI[] = []
  departmentsOrdering: DepartmentI[] = [];
  departmentsIssuing: DepartmentI[] = [];
  drugs?: InventoryI[] = [];
  myForm: FormGroup;
  myFormDetail: FormArray;
  receiptDetail: TransferDetailI[];
  doc: Document

  constructor(
    private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,
    private inventoryTranserService: InventoryTransferService,
    private inventoryService: InventoryService,
    public departmentService: DepartmentService,
    private elRef: ElementRef,
  ) {
    this.receiptDetail = []
    this.doc = (this.elRef.nativeElement as Document);
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
      orderTime: ['', Validators.required], approveBy: '', approveTime: '', issueBy: '',
      issueTime: '', receiveBy: '', receiveTime: '',
      orderNumber: ['', Validators.required],
      items: this.fb.array([])
    });

    // Get departments
    this.departmentService.getDepartments().subscribe((res:any)=> this.departments = res[0].data)

  
  }

  ngOnDestroy() {
    this.qtySubsc.unsubscribe;
  }
  ngAfterViewInit() {
      // select 2
      (<any> $('#departmentOrdering')).select2({placeholder:"Department to use items"});
      (<any> $('#departmentIssuing')).select2({placeholder:"Department Issuing items"});

  }

  filterDrugs(str: string) {
    this.drugs = this.inventoryService.filterInventory(str)
  }
  blurDrugInput(event: any) {
    if (event.target.value == '') {
      this.drugs = []
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
      this.drugs = [];
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
    if (this.myForm.valid && (this.myForm.controls['items'] as FormArray).length > 0) {
      this.inventoryTranserService.createTransfer(this.myForm.value).then(res => {
        (this.myForm.controls['items'] as FormArray).clear();
        this.myForm.reset();
      });

    } else {
      return
    }
  }
}
