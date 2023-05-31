import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  userName: string = "";
  pass: string = "";
  email: string = "";
  rol: string = "usuario";
  img: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";




  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  onClickRegister(): void {
    console.log('ddsads', this.pass.length);
    if (this.pass.length < 8) {
      alert('La contraseña tiene que tener al menos 8 caracteres');

    };

    if (this.userName.length <= 0) {
      alert('El usuario no puede estar vacio ⚠️');

    };

    if (this.email.length <= 0) {
      alert('El email no puede estar vacio ⚠️');

    };

    let params = {
      "name": this.userName,
      "email": this.email,
      "password": this.pass,
      "roll": this.rol,
      "img": this.img
    };
    this.userService.addNewUser(params).subscribe(
      response => {
        if (response.message === "Duplicate entry for email") {
          alert('El Email ya esta registrado, por favor elige otro ⚠️');
        }

        if (response.message === "User created successfully") {
          alert('Usuario creado correctamente ✅');
          console.log('sms->', response.message);
          window.location.reload();
        }
      },
      error => {
        console.log('ERROR-->', error);
      }
    );
  }

  onClickExit(): void {
    this.modalService.dismissAll();
  }
}
