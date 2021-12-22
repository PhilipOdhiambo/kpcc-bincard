import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { TransferDetailI } from 'src/app/models/inventory-transfer.interface';

@Component({
  selector: '[receipt-detail]',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {


  @Input() detail:TransferDetailI;
  @Input() index:number;
  @Output() delete = new EventEmitter<number>();


  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }


  quantityBlur(input:string) {
    let value = (parseFloat(input) * parseFloat(this.detail.cost)).toFixed(2).toString();
    if(value == 'NaN') {
      this.detail.value = '0.00';
    } else {
      this.detail.value = value;
    }
  }

  detailDelete() {
    this.delete.emit(this.index)
  }

}
