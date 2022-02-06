export interface InventoryTransferI {
  departmentOrdering:string;
  departmentIssuing:string;
  stockReceivedToBuffer:boolean;
  stockIssuedFromBuffer:boolean;
  orderBy:string;
  orderTime:Date;
  approveBy:string;
  approveTime:string;
  issueBy:string;
  issueTime:string;
  receiveBy:string;
  receiveTime:string;
  orderNumber:string;
  items:TransferDetailI[]
}

export interface TransferDetailI {
  code: string;
  description:string
  unit?:string;
  qtyOrdered:string;
  qtyIssued:string;
  cost:string;
  value:string;
  remarks:string;
}