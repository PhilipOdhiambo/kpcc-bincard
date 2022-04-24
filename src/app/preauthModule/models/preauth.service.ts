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

  async getpreauths() {
    return await this.http.get("http://localhost:3000/preauths").toPromise()
    
  }
}
