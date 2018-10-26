import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class CredentialsService {

  private credentialsURL = '../../assets/keys.json';


  constructor(private http: HttpClient) { }

  public getCredentials() {
    return this.http.get(this.credentialsURL);
  }
}
