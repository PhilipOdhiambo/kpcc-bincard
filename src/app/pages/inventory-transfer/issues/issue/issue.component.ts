import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { InventoryTransferI } from 'src/app/models/inventory-transfer.interface';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  myform: FormGroup;
  @Input() order: InventoryTransferI;
  @Output() updated = new EventEmitter<any>();
  currentOrderState: InventoryTransferI

  constructor(
    private fb: FormBuilder
  ) {}

  save() {

  }

  onSubmit(f:any) {
    const form = this.myform;
    this.updated.emit(form);

    
  }

  ngOnInit(): void {
    // this.currentOrderState = this.order
    this.myform = this.fb.group({
      departmentOrdering: this.fb.control({ value: this.order.departmentOrdering, disabled:false }),
      departmentIssuing: this.fb.control({ value: this.order.departmentIssuing, disabled:false }),
      orderNumber: this.fb.control({ value: this.order.orderNumber, disabled:false }),
      items: this.fb.array([])
    })
    const items = this.myform.get("items") as FormArray;
    Object.keys(this.order.items).forEach((i) => {
      items.push(
        this.fb.group({
          code: this.fb.control({ value: this.order.items[i].code, disabled: false }),
          description: this.fb.control({ value: this.order.items[i].description, disabled: false }),
          qtyOrdered: this.fb.control({ value: this.order.items[i].qtyOrdered, disabled: false }),
          qtyIssued: this.fb.control({ value: this.order.items[i].qtyIssued, disabled: false }),
          cost: this.fb.control({ value: this.order.items[i].cost, disabled: false }),
          remarks: this.fb.control({ value: this.order.items[i].remarks, disabled: false }),
        })
      );
    });
  }

}
