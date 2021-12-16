import { Component, OnInit } from '@angular/core';
import { InventoryI } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';


@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements OnInit {
  editButton:HTMLElement;
  activeDetail!:InventoryI;

  addMode=false;
  detailMode = false;
  placeholderMode = true

  inventory:Array<InventoryI>;
  inventory$:InventoryI[];

  constructor(
    private inventoryService:InventoryService
  ) { }

  ngOnInit(): void {
    this.inventoryService.localInventory$.subscribe(res => {
      this.inventory$ = [...res]
      this.inventory = this.inventory$
    })

  }

  newInventory() {
    this.placeholderMode = false;
    this.addMode = true;
    this.detailMode = false;
  }


  filterInventory(filterInput:HTMLInputElement) {
    let regex = new RegExp(filterInput.value,"i");
    this.inventory = this.inventory$.filter(item => regex.test(item.code) || regex.test(item.description));

  }


  activeRow($event:Event,activatedInventory:InventoryI){
    const selected = $event.target as HTMLElement;
    const previousSelection = document.querySelector('.active-row');
    if (previousSelection) {
      previousSelection.classList.remove('active-row');
    }
    selected.closest('tr').classList.add('active-row')
    this.placeholderMode = false;
    this.detailMode = true;
    this.addMode = false;
    // Pass data to detail component
    this.activeDetail = activatedInventory;
  }

  
}
