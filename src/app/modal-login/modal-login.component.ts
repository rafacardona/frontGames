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

  @Input() user: any;
  @Input() pass: any;
  responseUser: any;
  @ViewChild('modal-login') modal: any;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  setLogin(): void {
    const params = {
      "email": this.user,
      "password": this.pass
    };

    this.userService.login(params).subscribe(
      response => {
        this.responseUser = response.data;
        localStorage.setItem('user', JSON.stringify(this.responseUser));
        localStorage.setItem('isLogged', "yes");
        if(this.responseUser.roll === "administrador"){
          localStorage.setItem('isAdmin', 'yes');
        }else{
          localStorage.setItem('isAdmin', 'no');
        }

        if(response.message === "Credenciales incorrectas"){
          alert('⚠️ Error al inciar sesion');
          localStorage.setItem('isLogged', "no");
          window.location.reload();
        }

        alert('Bienvenido!');
        window.location.reload();
      },
      error => {
       
      }
    );
  }

  openRegisterModal(): void {
    this.modalService.open(ModalRegisterComponent);
  }
}
