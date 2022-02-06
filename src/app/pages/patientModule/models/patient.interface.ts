export interface PatientI {
  number: number,
  name: string,
  phone:string
  regimens:DrugRegimenI []
}

export interface DrugRegimenI {
  name:string,
  drugs:string[]
}