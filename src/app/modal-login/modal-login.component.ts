import { Component, Input, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import { AppComponent } from '../app.component';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {

  @Input() user: any = "";
  @Input() pass: any = "";
  responseUser: any;
  @ViewChild('modal-login') modal: any;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  setLogin(): void {
    const params = {
      "email": this.user,
      "password": this.pass
    };

    console.log(this.user.length, this.pass.length);

    if (this.user.length <= 0) {
      alert('⚠️ Error al inciar sesion');
    };

    if (this.pass.length < 8) {
      alert('⚠️ Error al inciar sesion');
    };

    this.userService.login(params).subscribe(
      response => {
        this.responseUser = response.data;
        console.log('respondedata', this.responseUser, 'data', response.message);
        if (response.message === "Credenciales incorrectas") {
          alert('⚠️ Error al inciar sesion');
          localStorage.setItem('isLogged', "no");
          window.location.reload();
        } else if (response.message === "Bienvenido") {
          localStorage.setItem('user', JSON.stringify(this.responseUser));
          localStorage.setItem('isLogged', "yes");
          if (this.responseUser.roll === "administrador") {
            localStorage.setItem('isAdmin', 'yes');
          } else {
            localStorage.setItem('isAdmin', 'no');
          };
          alert("Bienvenido!");
          window.location.reload();
        }
      },
      error => {
        alert('⚠️ Error al inciar sesion');
      }
    );
  }

  openRegisterModal(): void {
    this.modalService.open(ModalRegisterComponent);
  }
}
