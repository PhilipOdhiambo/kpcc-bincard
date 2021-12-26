// Title: RetrievalsComponent
// Purpose: Add retrievals from buffer

import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit,
  Renderer2, 
  Input} from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { DRUGS } from '../../shared/drug.Data';
import { Drug } from '../../models/types'
import * as moment from 'moment'; // monent is a library to handle time
import { BincardService } from '../../services/bincard.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'retrievals',
  templateUrl: './retrievals.component.html',
  styleUrls: ['./retrievals.component.scss']
})
export class RetrievalsComponent implements OnInit {

  private qtySubsc: Subscription = new Subscription();
  @Input() transfers:Subject<any>;

  constructor(
    private router: Router, private activeRoute: ActivatedRoute,   
    private binService: BincardService
  ) { }



  ngOnInit(): void {
    this.transfers.subscribe(res => console.log("Inside retrievals", res))
    
  }
  
  ngOnDestroy(){
  }

  
    // Cancel page
    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.activeRoute});
    }


}
