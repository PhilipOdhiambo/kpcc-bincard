import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreauthService {
  preauths = new BehaviorSubject([])

  constructor(
    private http: HttpClient
  ) {
  this.getpreauths()

  }

  getpreauths() {
    this.http.get("assets/preauth.data.json")
    .subscribe((res:any) => this.preauths.next(res[0].data) )
  }
}
