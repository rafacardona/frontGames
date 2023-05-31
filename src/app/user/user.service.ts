import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public log: boolean = false;
  constructor(private http: HttpClient) { }

  private url: string = "http://127.0.0.1:8000/api"
  private urlLogin: string = this.url + "/login";
  private newUserURL: string = this.url + "/crearUsuario";
  private urlUpdateUser: string = this.url + "/usuarios/update/";

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

  setImgUser(idUser: number, params: any): Observable<any> {
    return this.http.post<any>(this.urlUpdateUser + idUser, params);
  }

  updateUser(idUser: number, params: any): Observable<any> {
    return this.http.post<any>(this.urlUpdateUser + idUser, params);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any>(this.url + "/usuarios");
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.get<any>(this.url + "/usuarios/delete/" + idUser)
  }

}
