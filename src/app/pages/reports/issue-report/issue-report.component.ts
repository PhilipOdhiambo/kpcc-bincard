import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Input() issues;
  @ViewChild('table') table:ElementRef

  constructor(
    private http:HttpClient
  ) { }

  analyzeReport() {
    let table = this.table.nativeElement as HTMLTableElement
    let numRows = table.rows.length
    let data = []
    // Add table headers
    data.push([
      table.rows[0].cells.item(0).innerHTML,
      table.rows[0].cells.item(1).innerHTML,
      table.rows[0].cells.item(2).innerHTML,
      table.rows[0].cells.item(3).innerHTML,
      table.rows[0].cells.item(4).innerHTML,
      table.rows[0].cells.item(5).innerHTML,
      table.rows[0].cells.item(6).innerHTML,
    ])
    // Add table rows
    for (let i = 1; i < numRows; i ++) {
      data.push([
        table.rows[i].cells.item(0).innerHTML,
        table.rows[i].cells.item(1).innerHTML,
        table.rows[i].cells.item(2).innerHTML,
        table.rows[i].cells.item(3).innerHTML,
        table.rows[i].cells.item(4).innerHTML,
        parseFloat(parseFloat(table.rows[i].cells.item(5).innerText.replace(',','')).toFixed(2)),
        parseFloat(parseFloat(table.rows[i].cells.item(6).innerText.replace(',','')).toFixed(2)),
      ])
    }
    let server = "https://us-central1-bincard-kpcc.cloudfunctions.net/api/reports/issues"
    this.http.post(server,{data}).toPromise()
    .then(res => {
      // relocate to googlesheet
      let url = "https://docs.google.com/spreadsheets/d/1hWsRZteWKPMZ3v944LtMD7Qc_11Gs28__yE-AxqJKF0/edit#gid=1551913156";
      window.location.href = url;
    })
  }

  ngOnInit(): void {
  }

}
