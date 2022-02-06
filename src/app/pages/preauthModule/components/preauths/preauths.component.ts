import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from 'src/app/pages/patientModule/models/patient.service';
import { PreauthService } from '../../models/preauth.service';

@Component({
  selector: 'preauths',
  templateUrl: './preauths.component.html',
  styleUrls: ['./preauths.component.css']
})
export class PreauthsComponent implements OnInit, OnDestroy {

  constructor(
    public preauth$: PreauthService,
    public patient$: PatientService
  ) {
  }

  ngOnInit(): void {
    
  }

  show() {
    console.log(this.preauth$.preauths.value)
  }

  ngOnDestroy(): void {

  }



}
