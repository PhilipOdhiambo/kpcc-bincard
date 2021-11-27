import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { BincardService } from '../../services/bincard.service';
import { Issue, Receipt, TransDetail } from '../../models/types';
import * as moment from 'moment'; // Used to handle time
import * as XLSX from 'xlsx';  // To export the report to excel
import { FormControl } from '@angular/forms';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit, OnDestroy {

  // Subscriptions
  receiptsSubsc: Subscription;
  filterSubsc: Subscription;
  issuesSubsc: Subscription;

  receipts = [];
  issues = [];
  retrievals = []
  downloadLink: string

  filteredReceipts: Array<Receipt> = [];
  filteredIssues: Array<Issue> = [];
  reportToShow = [];

  reportType = new FormControl(null);
  startDate = new FormControl(null);
  endDate = new FormControl(null)

  constructor(
    private binService: BincardService,
    private router: Router, private activeRoute: ActivatedRoute,
    ) { }


  /* Geters */

  get getStartDate() {
    return this.startDate.value;
  }

  get getEndDate() {
    return this.endDate.value;
  }

  get getReportType() {
    return this.reportType.value;
  }

  get getReportToShow() {
    return this.reportToShow;
  }

  ngOnInit(): void {
    /* Reading receipts from the server */
    this.receiptsSubsc = this.binService.receipts.subscribe((receiptsCol: Array<Receipt>) => {
      const temp = [];
      receiptsCol.forEach(doc => {
        doc.receiptDetails.forEach((detail: TransDetail) => {
          temp.push({
            transDate: doc.receiptDate,
            transRef: doc.receiptRef,
            deptName: doc.receiptFrom,
            itemId: detail.item_id,
            itemCode: detail.itemCode,
            itemDesc: detail.itemDesc,
            itemCost: detail.itemPrice,
            itemQty: detail.itemQty,
            lineTotal: detail.lineTotal,
          });
        })
      })
      this.receipts = temp.sort((a, b) => {
        if (a.receiptDate < b.receiptDate) -1;
        if (a.receiptDate > b.receiptDate) 1;
        return 0;
      })
    });

    /* Reading issues from the server */
    this.issuesSubsc = this.binService.issues.subscribe((issues: Array<Issue>) => {
      const temp = [];
      issues.forEach((doc: Issue) => {
        doc.issueDetails.forEach((detail: TransDetail) => {
          temp.push({
            transDate: doc.issueDate,
            transRef: doc.issueRef,
            deptName: doc.issueTo,
            itemId: detail.item_id,
            itemCode: detail.itemCode,
            itemDesc: detail.itemDesc,
            itemCost: detail.itemPrice,
            itemQty: detail.itemQty,
            lineTotal: detail.lineTotal,
          });
        })
      })
      this.issues = temp.sort((a, b) => {
        if (a.issueDate < b.issueDate) -1;
        if (a.issueDate > b.issueDate) 1;
        return 0;
      })
    });

    // Read retrievals from the server
    this.binService.retrievalRef.valueChanges().subscribe(e => {
      this.retrievals = e
    })
  }

  ngAfterViewInit() {

    /* Set subscription to update view when start date is set */
    this.startDate.valueChanges.subscribe(start => {
      if (this.getEndDate && this.getReportType) {

        if (this.getReportType === 'receipts') {
          this.reportToShow = this.receipts.filter(receipt => {
            return  (receipt.transDate >= start && receipt.transDate <= this.getEndDate)
          })
        }
        if (this.getReportType === 'issues') {
          this.reportToShow = this.issues.filter(issue => {
            return issue.transDate >= start && issue.transDate <= this.getEndDate;
          })
        }
      }
    });

    /* Set subscription to update view when end date is set */
    this.endDate.valueChanges.subscribe(endDate => {
      if (this.getStartDate && this.getReportType) {

        if (this.getReportType === 'receipts') {
          this.reportToShow = this.receipts.filter(receipt => {
            return receipt.transDate >= this.getStartDate && receipt.transDate <= endDate;
          })
        }

        if (this.getReportType === 'issues') {
          this.reportToShow = this.issues.filter(issue => {
            return issue.transDate >= this.getStartDate && issue.transDate <= endDate;
          })
        }
      }

    });

    /* Set subscription to update view when report type is set */
    this.reportType.valueChanges.subscribe(reportType => {
      if (this.getStartDate && this.getEndDate) {

        if (reportType === 'receipts') {
          this.reportToShow = this.receipts.filter(receipt => {
            return receipt.transDate >= this.getStartDate && receipt.transDate <= this.getEndDate;
          })
        }
        if (reportType === 'issues') {
          this.reportToShow = this.issues.filter(issue => {
            return issue.transDate >= this.getStartDate && issue.transDate <= this.getEndDate;
          })
        }
        if (reportType === 'retrievals') {
          let temp = []
          this.retrievals.forEach(retrieval => {
            if (retrieval.receiptDate >= this.getStartDate && retrieval.receiptDate <= this.getEndDate) {
              retrieval.receiptDetails.forEach(detail => {
                
                temp.push({

                  transDate: retrieval.receiptDate,
                  transRef: 'N/A',
                  deptName: 'N/A',
                  itemId: detail.item_id,
                  itemCode: detail.itemCode,
                  itemDesc: detail.itemDesc,
                  itemCost: detail.itemPrice,
                  itemQty: detail.itemQty,
                  lineTotal: detail.lineTotal,
                })
              })
            }

          })
          this.reportToShow = temp 
        }
      }
    });

  }
  ngOnDestroy() {
    this.receiptsSubsc.unsubscribe();
    this.issuesSubsc.unsubscribe();
  }

  /* Custom Functions */

    // Cancel page
    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.activeRoute});
    }

  onChangeStartDate(startDateStr: string) {
    this.startDate.setValue(moment(new Date(startDateStr)).format('YYYY-MM-DD'));
  }

  onChangeEndDate(endDateStr: string) {
    this.endDate.setValue(moment(new Date(endDateStr)).format('YYYY-MM-DD'));
  }


  /* Download report displayed to xlsx */
  onDownloadClick() {
    const data = this.getReportToShow;
    if (data.length < 1) {
      alert('No record(s) found. Verify "Start Date" and "End Date" !!.');
      return
    }

    if (!this.getReportType) {
      alert('Error. You must select a "Report Type".');
      return
    }

    const wb = XLSX.utils.book_new(); // Create a new workbook
    let header;
    let sheetName;
    let wkBookName;

    if (this.getReportType === 'receipts') {
      header = [{ date: 'Date', ref: 'S11 No.', type: 'Department(From)', id: 'item#', code: 'code', item: 'Item',
        cost: 'Cost', quantity: 'Quantity', total: 'Total' }];

        sheetName = 'receipts';
        wkBookName = 'receipts';

    }

    if (this.getReportType === 'issues') {
      header = [{ date: 'Date', ref: 'S11 No.', type: 'Department(To)', id: 'item#', code: 'code', item: 'Item',
        cost: 'Cost', quantity: 'Quantity', total: 'Total' }]
        sheetName = 'issues';
        wkBookName = 'issues';
    }
    if (this.getReportType === 'retrievals') {
      header = [{ date: 'Date', ref: 'S11 No.', type: 'Department(To)', id: 'item#', code: 'code', item: 'Item',
        cost: 'Cost', quantity: 'Quantity', total: 'Total' }]
        sheetName = 'retrievals';
        wkBookName = 'retrievals';
    }

    // Create sheet with appropriate header
    const ws = XLSX.utils.json_to_sheet(header,{skipHeader:true});

    // Add the body starting on range 'A2' not to overide the header
    XLSX.utils.sheet_add_json(ws, data, { skipHeader: true, origin: 'A2' });

    // Append the sheet into the workbook and assign it the appropriate name
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Write the workbook to file with appropriate name
    //XLSX.writeFile(wb, wkBookName + '.xlsx');
    const blob = new Blob([XLSX.stream.to_html(wb)])
    this.downloadLink = URL.createObjectURL(blob)
    window.open(this.downloadLink);
    
  }

}
