import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})

export class DeleteBtnComponent implements OnInit {

  idUser: any;
  constructor(public modal: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('deleteId');
  }

  deleteUser(): void {
    this.userService.deleteUser(this.idUser).subscribe(
      response => {
        alert('Usuario Eliminado Correctamente ✔️');
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    )
  }

  exit(): void{
    this.modal.dismissAll();
  }


}
