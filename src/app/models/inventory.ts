export interface InventoryI {
    id?:string
    code:string; 
    unit:string;
    description:string;
    buying:string;
    markup:string;
    selling:string;
  }

  export default class Inventory implements InventoryI {
    id:string
    code: string;
    unit: string;
    description: string;
    buying: string;
    selling: string;
    markup: string;


    constructor(code,unit,description,buying,markup="1.33") {
        this.code = code;
        this.unit = unit;
        this.description = description;
        this.buying = buying;
        this.markup = markup.toString()
        this.selling = (parseFloat(this.buying)* parseFloat(this.markup)).toString()
        if (this.selling == "NaN") {
          this.selling = "0.00"

        }
    }  

  }