export interface PatientI {
  hospital_number: number,
  patient_name: string,
  contact_number:string,
  alternative_contact:string,
  doctor_name:string,
  doctor_contact:string,
  register_date:string
  regimen:DrugRegimenI []
}

export interface DrugRegimenI {
  regimen_name:string,
  regimen_category:string
}
