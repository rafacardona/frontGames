import { Component, Input, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import { AppComponent } from '../app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
        console.log('respues final', response)
        this.responseUser = response.data;
        localStorage.setItem('user', JSON.stringify(this.responseUser));
        localStorage.setItem('isLogged', "yes");
        window.location.reload();
      },
      (error) => {
        console.error('Error al iniciar sesion', error);
        console.log('fuera', params);
      }
    );
  }

  openRegisterModal(): void {
    this.modalService.open(ModalRegisterComponent);
  }
}
