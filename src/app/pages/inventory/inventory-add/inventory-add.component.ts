import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import Inventory, { InventoryI } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})
export class InventoryAddComponent implements OnInit {

  newInventory: Inventory;

  inventoryList:Array<any> = []
  inventoryListSubscription:Subscription

  duplicateCode = false;


  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.instantiateInventory()
    this.resetFields()
  }

  instantiateInventory() {
    this.inventoryListSubscription = this.inventoryService.inventoryListObserver
    .subscribe(list => this.inventoryList = list)
  }

  addNewInventory(myform: NgForm) {

    if (myform.valid && this.duplicateCode==false) {
      let inventory:InventoryI = {
        code: this.newInventory.code, 
        buying: this.newInventory.buying, 
        description: this.newInventory.description, 
        markup: this.newInventory.markup,
        selling: this.newInventory.selling,
        unit:this.newInventory.unit
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
    this.newInventory.selling = (parseFloat(this.newInventory.buying) * parseFloat(this.newInventory.markup)).toString()
  }

  resetFields() {
    this.newInventory = new Inventory("", "", "", "");
  }


}
