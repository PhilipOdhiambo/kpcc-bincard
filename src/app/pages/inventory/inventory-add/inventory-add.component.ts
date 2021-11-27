import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import Inventory, { InventoryI } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})
export class InventoryAddComponent implements OnInit {

  i: Inventory;
  inventoryList:Array<any> = []
  duplicateCode = false;


  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.resetFields()

    // this.inventoryService.getInventory().subscribe((list:Array<any>) => {
    //   this.inventoryList = list

    // })

    this.inventoryList = this.inventoryService.inventoryList

  }

  addNewInventory(myform: NgForm) {

    if (myform.valid && this.duplicateCode==false) {
      let inventory:InventoryI = {
        code: this.i.code, 
        buying: this.i.buying, 
        description: this.i.description, 
        markup: this.i.markup,
        selling: this.i.selling,
        unit:this.i.unit
      }
      this.inventoryService.createInventory(inventory)
      this.resetFields();
      return      
    }
  }

  flagDuplicateCode(codeInput:HTMLInputElement) {
    const errorDiv:HTMLDivElement = document.querySelector(".code-exist.text-danger");
    const duplicate = this.inventoryList.filter(inventory => inventory.code == codeInput.value);
    if (duplicate.length > 0) {
      errorDiv.hidden = false;
      this.duplicateCode = true;
    } else {
      errorDiv.hidden = true;
      this.duplicateCode = false;
    }

  }


  recalculate() {
    this.i.selling = (parseFloat(this.i.buying) * parseFloat(this.i.markup)).toString()
  }

  resetFields() {
    this.i = new Inventory("", "", "", "");
  }


}
