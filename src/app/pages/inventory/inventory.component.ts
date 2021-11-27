import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  inventory$:Observable<any>;

  constructor(
    private inventoryService:InventoryService
  ) { }

  ngOnInit(): void {
    this.inventory$ = this.inventoryService.getInventory();
  }

  newInventory() {
    this.placeholderMode = false;
    this.addMode = true;
    this.detailMode = false;
  }


  activeRow($event:Event){
    const selected = $event.target as HTMLElement;
    const currentRed = document.querySelector('.active-row');
    if (currentRed) {
      currentRed.classList.remove('active-row');
    }
    selected.closest('tr').classList.add('active-row')
    this.placeholderMode = false;
    this.detailMode = true;
    this.addMode = false;

  }

  log(n:InventoryI){
    this.activeDetail = n;
  }
}

function undoEdit() {

}


