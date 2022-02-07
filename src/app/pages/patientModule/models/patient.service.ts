import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { PatientI } from './patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patients = new BehaviorSubject<PatientI[]>([])
  patientsFiltered = new BehaviorSubject<PatientI[]>([])


  constructor(
    private http: HttpClient
  ) {
    this.getPatients()
  }

  getPatients() {
    this.http.get("assets/patient.data.json")
      .subscribe((res: any) => {
        this.patients.next(res[0].data)
      })
  }

  filterPatients(filter?: string) {
    const patients: PatientI[] = this.patients.value;
    if (!filter) {
      this.patientsFiltered.next(patients);
      return;
    }
    const temp = patients.filter(patient => {
      return (patient.patient_name.toLowerCase().includes(filter.toLowerCase()))
    })
    this.patientsFiltered.next(temp)
  }

}

