
// Drug
export interface Drug {
    code?:string,
    description:string,
    cost:number,
    price:number
}

/* Receipt and Issue types */

// Drug Receipt
export interface Receipt {
    receiptDate: string,
    receiptRef: string,
    receiptFrom: string,
    receiptBy?: string,
    receiptDetails: Array<TransDetail>
}

  // Drug Issue
export interface Issue {
    issueDate: string,
    issueRef: string,
    issueTo: string,
    issueBy?: string,
    issueDetails: Array<TransDetail>
}

/* Transaction Detail */
export interface TransDetail {
    itemDesc: string,
    itemPrice: number,
    itemQty: number,
    itemExpiry?: string,
    lineTotal: number
  }




