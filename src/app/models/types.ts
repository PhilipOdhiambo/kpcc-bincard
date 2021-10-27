
// Drug
export interface Drug {
    id: string,
    code?:string,
    description:string,
    cost:string,
    price:string
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
    item_id: string,
    itemCode: string,
    itemDesc: string,
    itemPrice: number,
    itemQty: number,
    itemExpiry?: string,
    lineTotal: number
  }




