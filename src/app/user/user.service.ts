import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public log: boolean = false;
  constructor(private http: HttpClient) { }

  private urlLogin: string = "http://127.0.0.1:8000/api/login";
  private newUserURL: string ="http://127.0.0.1:8000/api/crearUsuario";

  login(params: any): Observable<any> {
    return this.http.post(this.urlLogin, params);
  }

  getLoginStatus(): boolean {
    return this.log;
  }

  changeStatus(): void {
    this.log = !this.log;
  }

  logOut(): void {
    if (this.log === true) {
      this.log = false;
      localStorage.clear();
      window.location.reload();
    }
  }

  addNewUser(params: any): Observable<any> {
    return this.http.post(this.newUserURL, params);
  }
}
