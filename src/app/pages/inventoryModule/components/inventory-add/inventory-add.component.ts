import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import Inventory, { InventoryI } from 'src/app/pages/inventoryModule/models/inventory';
import { InventoryService } from '../../models/inventory.service';

@Component({
  selector: 'inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})
export class InventoryAddComponent implements OnInit {

  newInventory: Inventory;
  inventory$:Observable<InventoryI[]>

  inventoryList:Array<any> = []
  inventoryListSubscription:Subscription

  duplicateCode = false;


  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.instantiateInventory()
    this.resetFields()
    this.inventoryList = JSON.parse(localStorage.getItem("inventory"))
  }

  instantiateInventory() {
    this.inventoryListSubscription = this.inventoryService.inventory$
    .subscribe(list => this.inventoryList = list)
  }

  addNewInventory(myform: NgForm) {

    if (myform.valid) {
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
    const duplicate = this.inventoryList.filter(inventory => inventory.code != codeInput.value);
    if (duplicate.length > 0) {
      this.duplicateCode = true;
    } else {
      this.duplicateCode = false;
    }

  }


  recalculate() {
    this.newInventory.selling = (parseFloat(this.newInventory.buying) * parseFloat(this.newInventory.markup)).toFixed(2).toString();
  }

  resetFields() {
    this.newInventory = new Inventory("", "", "", "");
  }


}
