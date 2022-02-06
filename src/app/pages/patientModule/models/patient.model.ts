import { DrugRegimenI, PatientI } from "./patient.interface";

export class Patient implements PatientI {
  number: number;
  name: string;
  phone: string;
  regimens: DrugRegimenI[];  
}