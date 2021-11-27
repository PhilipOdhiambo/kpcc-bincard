import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss']
})
export class DeleteAlertComponent implements OnInit {
  
  @Output() delete = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  response(resp:boolean) {
    this.delete.emit(resp);

  }


}
