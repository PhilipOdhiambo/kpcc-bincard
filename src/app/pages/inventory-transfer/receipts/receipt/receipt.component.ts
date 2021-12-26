import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { TransferDetailI } from 'src/app/models/inventory-transfer.interface';

@Component({
  selector: '[receipt-detail]',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ReceiptComponent implements OnInit, AfterViewInit {


  @Input() detail:TransferDetailI;
  @Input() index:number;
  @Output() delete = new EventEmitter<number>();
  @ViewChild('qty') qty:ElementRef;
  doc:any


  constructor(private viewContainerRef: ViewContainerRef,private fb:FormBuilder,
    private elRef:ElementRef) {
      this.doc = (this.elRef.nativeElement as Document);
      //this.quantity = this.fb.control()

     }

  ngOnInit(): void {
   

  }

  ngAfterViewInit() {
    setTimeout(() => {
      (this.doc.querySelector('#quantity')as HTMLInputElement).focus()

      //this.qty.nativeElement.focus();   
    }, 0);

  }


  quantityBlur() {
    let value = (parseFloat(this.detail.qtyOrdered) * parseFloat(this.detail.cost)).toFixed(2).toString();
    if(value == 'NaN') {
      this.detail.value = '0.00';
    } else {
      this.detail.value = value
    }
  }

  detailDelete() {
    this.delete.emit(this.index)  
  }

}
