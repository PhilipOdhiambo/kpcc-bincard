import { PreauthService } from "./preauth.service";
import { PreathI, PreauthDetailI } from "./preauth.interface";

export class Preath implements PreathI {
  date: Date;
  patient_number: number;
  patient_name: string;
  preath_detail: PreauthDetailI[];


  constructor(
  ) {

  }


  

}