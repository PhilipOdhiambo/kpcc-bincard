import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Inventory, { InventoryI } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit,OnChanges {
  


  @Input("detail") detail
  i:InventoryI




  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.i = this.detail    
  }

  ngOnChanges(chages: SimpleChanges) {
    this.i = chages.detail.currentValue
  }


  editSave(btn:HTMLButtonElement) {
   const inputs =  document.querySelectorAll("form input");
   const undoButton:HTMLButtonElement = document.querySelector('.form-edit .btn-outline-primary')
    if (btn.innerText == "Edit") {
      inputs.forEach((input:HTMLInputElement) => input.readOnly = false)
      btn.innerHTML = "Update";
      undoButton.disabled = false;
    } else {

      this.inventoryService.editInventory({
        buying: this.i.buying, code: this.i.code, description: this.i.description, markup:this.i.markup,
        selling: this.i.selling, unit: this.i.unit, id:this.i.id
      })
  
      inputs.forEach((input:HTMLInputElement) => input.readOnly = true)

      btn.innerHTML = "Edit";
      undoButton.disabled = true;
    }
  }


  recalculate() {
    this.i.selling = (parseFloat(this.i.buying) * parseFloat(this.i.markup)).toString()
  }

  undoEdit() {
    this.i = this.detail;
  }


  resetFields() {
    this.i = new Inventory("", "", "", "");
  }

  deleteInventory() {
    this.inventoryService.deleteInventory(this.i.id);
    this.resetFields()
  }

}
