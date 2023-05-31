import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { Router } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle: string = 'GameRanking';
  userId: number = 12;
  isLogged: boolean = false;
  isAdmin: boolean = false;


  constructor(private modalService: NgbModal, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('isLogged') === "yes";
    this.isAdmin = localStorage.getItem('isAdmin') === "yes";
  }

  openModalLogin(): void {
    this.modalService.open(ModalLoginComponent);
  }

  openProfileUser(): void {
    this.router.navigate(["/profile", this.userId]);
  }

  getStatusLog(): boolean {
    return this.isLogged;
  }

  logOut(): void {
    this.isLogged = false;
    this.isAdmin = false;
    localStorage.clear();
    this.router.navigate(["/games"]);
  }
  
  openAdminTable(): void {
    this.router.navigate(["/table"]);
  }

}
