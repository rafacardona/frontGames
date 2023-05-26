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
  public isLogged: boolean = false;


  constructor(private modalService: NgbModal, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('isLogged') === "yes"; 
  }

  openModalLogin(): void {
    this.modalService.open(ModalLoginComponent);
  }

  openProfileUser(): void {
    this.router.navigate(["/profile", this.userId])
  }

  getStatusLog(): boolean {
    return this.isLogged;
  }

  logOut(): void {
    console.log('cerrar sesion');
    this.isLogged = false;
    localStorage.clear();
    this.router.navigate(["/games"]);
  }

}
