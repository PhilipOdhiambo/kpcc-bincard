
// Title: AddReceipt Componet
// Purpose: To enable adding of a new receipt to the database

import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit,
ViewContainerRef} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import * as moment from 'moment'; // monent is a library to handle time
import {Subscription} from 'rxjs';
import { TransferDetailI } from 'src/app/models/inventory-transfer.interface';
import { InventoryI } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryTransferService } from 'src/app/services/inventory-transfer.service';
import { DepartmentI } from 'src/app/models/department.Interface';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit,AfterViewInit  {

  @ViewChild('dept') dept:ElementRef;
  @ViewChild('drugSearch') drugSearch:ElementRef;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChildren('qty') qty:QueryList<ElementRef>;

  private qtySubsc: Subscription = new Subscription();
  filteredDepartments:DepartmentI[] = [];
  filteredDrugs: InventoryI[] = [];
  myForm: FormGroup;
  myFormDetail:FormArray;
  receiptDetail:TransferDetailI[];

  constructor(
    private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,   
    private inventoryTranserService: InventoryTransferService,
    private inventoryService:InventoryService,
    private departmentService:DepartmentService,
    private elRef:ElementRef
  ) {
    this.receiptDetail = []
    
   }


  /* Geters */
  get formRef() {
    return this.myForm.controls.receiptRef as FormControl;
  }
  get sourceName() {
    return this.myForm.controls.receiptFrom as FormControl;
  }

  get formDetails () {
    return this.myForm.get('items') as FormArray;
  }

  // get formDetailTotal () {
  //   return this.formDetails.controls.reduce((acc,curr) => {
  //     return acc + curr.get('lineTotal').value || 0;
  //   },0);
  // }
  
  ngOnInit(): void {

    /* Declare and Initialize reactive form */
    this.myForm = this.fb.group({
      departmentOrdering: ['', Validators.required],
      departmentIssuing: ['', Validators.required],
      fromBufferOrWoking: '',
      toBufferOrWorking: "",
      orderBy: '',
      orderTime: [ moment(new Date()).format('YYYY-MM-DD'),Validators.required],
      approveBy: '',
      approveTime: '',
      issueBy: '',
      issueTime: '',
      receiveBy: '',
      receiveTime: '',
      quantity:'',
      items: this.fb.array([])
    });
    this.departmentService.department$.subscribe(res => this.filteredDepartments = res)
    
  }

  spliceTransferDetail(index:number) {
    this.receiptDetail.splice(index,1)   
  }
  
  
  ngAfterViewInit() {
    
  }


  ngOnDestroy(){
    this.qtySubsc.unsubscribe;
  } 
  
  
  // Filter Departments and add the selected department
  filterDepartments(str:string) {
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

  onClickInDeptInput() {
   this.filterDepartments('')
  }


  filterDrugs(str:string) {
    this.filteredDrugs = this.inventoryService.filterInventory(str)
  }

  onClickOutDrugInput() {
    this.filteredDrugs = [];
    (this.drugSearch.nativeElement as HTMLInputElement).value = ''
  }

  onClickInDrugInput() {
    this.filterDrugs('')
  }

  // Cancel page
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }
  // When date is picked
  onDateUpdate(date: string){
    this.myForm.get('receiptDate').setValue(date);
  }

  // Add drugs to the detail section of the form
  onDrugClick(drug: InventoryI, drugSearch:HTMLInputElement) {
    this.receiptDetail.push({
      code: drug.code, cost:drug.buying, description: drug.description,
      qtyOrdered:'',qtyIssued: '', remarks: '', value: drug.buying
    })
    const deptOrdering:HTMLSelectElement = (this.elRef.nativeElement as Document).querySelector('#departmentOrdering')
    const deptIssuing:HTMLSelectElement = (this.elRef.nativeElement as Document).querySelector('#departmentIssuing')
    console.log(this.myForm.value);
    setTimeout(() => {
      drugSearch.value = '';
      this.filteredDrugs = []
    }, 0);

  }

  onDeptClick(department:DepartmentI, departmentInput:HTMLInputElement) {
    
    setTimeout(() => {
      (this.dept.nativeElement as HTMLInputElement).value = department.unitName;
      this.filteredDepartments = []
    }, 0);
  }

  // When the value of qty field changed it updates the lineTotal field
  qtyOnChange(index) {
    const qty = this.formDetails.at(index).get('itemQty').value;
    const cost = this.formDetails.at(index).get('itemPrice').value;
    this.formDetails.at(index).get('lineTotal').setValue(qty * cost);    
  }


  // Clear form
  clearForm() {
    if(confirm("This action will Delete your work")) {
      this.myForm.reset();
    } else {
      return
    }    
  }

  // Saving form information
   saveForm() {
     if (this.receiptDetail.length == 0) {
       return
     }
    this.receiptDetail.forEach(detail =>  {
      (this.myForm.controls['items'] as FormArray).push(this.fb.group(detail))
    })
   this.inventoryTranserService.createTransfer(this.myForm.value).then(res => this.receiptDetail = [])  
  }
}
