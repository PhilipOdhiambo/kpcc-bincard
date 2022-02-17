
// Title: AddReceipt Componet
// Purpose: To enable adding of a new receipt to the database

import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment'; // monent is a library to handle time
import { Subscription } from 'rxjs';
import { TransferDetailI } from 'src/app/models/inventory-transfer.interface';
import { InventoryI } from 'src/app/pages/inventoryModule/models/inventory';
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';
import { DepartmentI } from 'src/app/models/department.Interface';
import { InventoryService } from '../../inventoryModule/models/inventory.service';
import { DepartmentService } from '../../deparmentModule/models/department.service';

@Component({
  selector: 'receipts',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class ReceiptsComponent implements OnInit {

  @ViewChildren('qty') qtyArr: QueryList<ElementRef>;

  private qtySubsc: Subscription = new Subscription();
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

  getDepartmentOrdering(event:any) {
    this.departmentsOrdering = this.departmentService.filterDepartments(event.target.value)
  }

  getDepartmentIssuing(event:any) {
    this.departmentsIssuing = this.departmentService.filterDepartments(event.target.value)
  }
  blurDepartmentInputs(event:any) {
    if (event.target.value == '') {
      this.departmentsIssuing = this.departmentService.filterDepartments("xxx sentinel string");
      this.departmentsOrdering = this.departmentService.filterDepartments("xxx sentinel string");
      return;
    }

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
  }

  ngOnDestroy() {
    this.qtySubsc.unsubscribe;
  }

  filterDrugs(str: string) {
    this.drugs = this.inventoryService.filterInventory(str)
  }
  blurDrugInput(event:any){
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
    this.receiptDetail.forEach(detail => {
      (this.myForm.controls['items'] as FormArray).push(this.fb.group(detail))
    })
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
