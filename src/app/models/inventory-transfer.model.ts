import { InventoryTransferI, TransferDetailI } from "./inventory-transfer.interface";

export class InventoryTransfer implements InventoryTransferI {
  departmentOrdering: string;
  departmentIssuing: string;
  fromBufferOrWoking: string;
  stockIssuedFromBuffer: boolean;
  stockReceivedToBuffer: boolean;
  orderBy: string;
  orderTime: Date;
  approveBy: string;
  approveTime: string;
  issueBy: string;
  issueTime: string;
  receiveBy: string;
  receiveTime: string;
  items: TransferDetailI[];
  orderNumber: string;
  constructor() {

  }



}