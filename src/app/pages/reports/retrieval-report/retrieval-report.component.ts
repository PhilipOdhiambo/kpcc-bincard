import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'retrieval-report',
  templateUrl: './retrieval-report.component.html',
  styleUrls: ['./retrieval-report.component.css']
})
export class RetrievalReportComponent implements OnInit {

  @Input() retrievals;

  constructor() { }

  ngOnInit(): void {
  }

}
