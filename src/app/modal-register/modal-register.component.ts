import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onClickRegister(): void {
    let params = {
      "name": this.userName,
      "email": this.email,
      "password": this.pass,
      "roll": this.rol,
      "img": this.img
    };
    console.log(params);
    this.userService.addNewUser(params).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      }
    );
    alert('usuario registrado');
  }
}
