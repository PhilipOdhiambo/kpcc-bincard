export interface InventoryTransferI {
  departmentFrom:string;
  departmentTo:string;
  fromBufferOrWoking:string;
  toBufferOrWorking:string;
  orderBy:string;
  approvedBy:string;
  issuedBy:string;
  receivedBy:string;
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