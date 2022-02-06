export interface PreathI {
  date: Date,
  patient_name: string,
  patient_number: number
  preath_detail: PreauthDetailI[]
}

export interface PreauthDetailI {
  regimen: string,
  total_quanity: number,
  total_price: number,
  regimen_detail: RegimentDetail[]

}

export interface RegimentDetail {
  strength: string,
  quantity:number,
  unit_price: number,
  total_price:number
}