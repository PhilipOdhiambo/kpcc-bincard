import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { PatientI } from 'src/app/pages/patientModule/models/patient.interface';
import { PatientService } from 'src/app/pages/patientModule/models/patient.service';
import { PreauthService } from '../../models/preauth.service';

@Component({
  selector: 'preauths',
  templateUrl: './preauths.component.html',
  styleUrls: ['./preauths.component.css']
})
export class PreauthsComponent implements OnInit, OnDestroy {
  
  @ViewChild('input') searchInput: ElementRef;
  activePatient:PatientI

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

  showPatientDetail(index:number) {
    this.activePatient = this.patient$.patientsFiltered.value[index];
    (this.searchInput.nativeElement as HTMLInputElement).value = "";
    this.patient$.patientsFiltered.next([]);

  }


  ngOnDestroy(): void {

  }



}
