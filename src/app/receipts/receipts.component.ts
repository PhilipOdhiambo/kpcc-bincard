
// Title: AddReceipt Componet
// Purpose: To enable adding of a new receipt to the database

import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit,
  Renderer2 } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { Departments } from '../shared/department.Data';
import { DRUGS } from '../shared/drug.Data';
import { Drug } from '../shared/types'
import * as moment from 'moment'; // monent is a library to handle time
import { BincardService } from '../shared/bincard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit,AfterViewInit  {

  @ViewChild('dept') dept:ElementRef;
  @ViewChild('drugSearch') drugSearch:ElementRef;
  @ViewChildren('detail',{read: ElementRef}) detailList:QueryList<ElementRef>;
  @ViewChildren('qty') qty:QueryList<ElementRef>;

  private qtySubsc: Subscription = new Subscription();
  filteredDepartments:string[] = [];
  filteredDrugs: Array<Drug> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,   
    private renderer: Renderer2,
    private binService: BincardService
  ) { }

    /* Declare and Initialize reactive form */
    myForm = this.fb.group({
      receiptFrom: ['', Validators.required],
      receiptRef: ['', Validators.required],
      receiptDate: [ moment(new Date()).format('YYYY-MM-DD'),Validators.required],
      receiptDetails: this.fb.array([])
    });

  /* Geters */
  get formRef() {
    return this.myForm.controls.receiptRef as FormControl;
  }
  get sourceName() {
    return this.myForm.controls.receiptFrom as FormControl;
  }

  get formDetails () {
    return this.myForm.get('receiptDetails') as FormArray;
  }

  get formDetailTotal () {
    return this.formDetails.controls.reduce((acc,curr) => {
      return acc + curr.get('lineTotal').value || 0;
    },0);
  }
  
  ngOnInit(): void { 

  }
  
  ngAfterViewInit() {
    this.qtySubsc = this.qty.changes.subscribe(
    (change:QueryList<ElementRef>) =>{
      if (change.length) {
        const node = this.renderer.selectRootElement(change.last.nativeElement);
        setTimeout(() => node.focus(), 0);
      }      
    }
  )
  }
  ngOnDestroy(){
    this.qtySubsc.unsubscribe;
  } 
  
  // Filter Departments and add the selected department
  filterDepartments(str:string) {
    this.filteredDepartments = Departments.filter(department => {
      const regex = new RegExp(str,'i');
      return department.search(regex) > -1;
    });
  }

  // When a department is selected from the dropdown
  onDeptClick(d) {
    this.myForm.get('receiptFrom').setValue(d);
    this.filteredDepartments = [];
  }
  onDeptclickOutside() {
    this.filteredDepartments = [];
  }


  // Filter Drugs and add the selected drug
  filterDrugs(str:string) {
    this.filteredDrugs = DRUGS.filter(drug => {
      const regex = new RegExp(str,'i');
      return drug.description.search(regex) > -1;
    });
  }

  onDrugclickOutside() {
    this.filteredDrugs = [];
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
  onDrugClick(drug: Drug, drugSearch:HTMLInputElement) {
    this.formDetails.push(
      this.fb.group(
        {
          itemDesc: [drug.description],
          itemPrice: [drug.cost],
          itemQty: ['', Validators.required],
          lineTotal: [null]
        }
      )      
    );
    drugSearch.value = '';
  }

  // When the value of qty field changed it updates the lineTotal field
  qtyOnChange(index) {
    const qty = this.formDetails.at(index).get('itemQty').value;
    const cost = this.formDetails.at(index).get('itemPrice').value;
    this.formDetails.at(index).get('lineTotal').setValue(qty * cost);    
  }

  // When the qty field is tabbed focus goes back to the search field
  focusOnSearch() {
    const searchInput = this.drugSearch.nativeElement;
    setTimeout(() => {searchInput.focus()}, 0);
    
  }

  // Deleteing a single detail line 
  detailDelete(index) {
    this.formDetails.removeAt(index);
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

    this.binService.receiptColRef.doc('' + this.formRef.value).set(this.myForm.value)
    .then(() => {

      alert('Operation Successful..');

      /* I choose to clear individual controls instead of using an easier method "form.reset()"
      because this method messes up the tabbing functionality for the next data entry */

      this.myForm.get('receiptFrom').setValue('');
      this.myForm.get('receiptRef').setValue('');
      this.myForm.get('receiptDate').setValue('');
      this.formDetails.controls.splice(0);
    });   
  }
}
