import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteBtnComponent } from '../delete-btn/delete-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.css']
})

export class TableAdminComponent implements OnInit { 
  allUsers: any = [] ;
  name: string = "";
  pass: string = "";
  email: string = "";
  img: string = "";

  constructor(private userService: UserService, private modal: NgbModal, private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem('isAdmin') !== "yes"){
      this.router.navigate(["/games"]);
    }
    this.userService.getAllUsers().subscribe(
      response => {
        this.allUsers = response;
        this.allUsers = this.allUsers.data;
      }
    );
  }

  deleteUser(id: any): void{
    this.modal.open(DeleteBtnComponent); 
    localStorage.setItem('deleteId', id);
  }



}
