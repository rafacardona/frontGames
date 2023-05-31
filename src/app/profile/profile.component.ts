import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  private userId: number = 0;
  editActive: boolean = true;
  name: string = "";
  date: string | undefined;
  mail: string | undefined;
  img: string | undefined;
  pass: string | undefined;
  userObject: any;
  userData: any;
  changeImg: boolean = false;
  newImg: string = "";
  dateUserAdd: string = "";
  newName: string = "";
  newPass: string = "";


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLogged') !== "yes") {
      this.router.navigate(["/games"]);
    }
    this.userData = localStorage.getItem('user');
    this.userObject = JSON.parse(this.userData);
    this.userId = this.userObject.id;
    this.name = this.userObject.name;
    this.mail = this.userObject.email;
    this.img = this.userObject.img
    this.pass = this.userObject.password;
    this.dateUserAdd = this.userObject.created_at;
    console.log('volvimo<s ->', this.img);
  }

  activeEditProfile(): void {
    this.editActive = !this.editActive;
  }

  newImgProfile(): void {
    let params = {
      "name": this.name,
      "email": this.mail,
      "password": this.pass,
      "img": this.newImg
    };
    this.userService.setImgUser(this.userId, params).subscribe(
      () => {
        this.changeImg = false;
        this.userObject.img = this.newImg;
        const updateImg = JSON.stringify(this.userObject);
        localStorage.setItem('user', updateImg);
        alert('Imagen cambiada con exito ✔️');
      },
      error => {
        console.error('ERROR --->', error, this.userId);
      }
    );
    this.img = this.newImg;
  }

  openChangeImg(): void {
    this.changeImg = !this.changeImg;
  }

  updateUser(): void {
    let name = this.name;
    let pass = this.pass;
    if (this.newName !== this.name && this.newName !== "") {
      name = this.newName;
    }

    if (this.newPass !== this.pass && this.newPass !== "") {
      pass = this.newPass;
    }

    let params = {
      "name": name,
      "email": this.mail,
      "password": pass,
      "img": this.img
    };

    this.userService.updateUser(this.userId, params).subscribe(
      () => {
        this.userObject.name = this.name;
        const update = JSON.stringify(this.userObject);
        localStorage.setItem('user', update);
        alert('USUARIO ACTUALIZADO CON EXITO ✅');
      },
      error => {
        alert('Algo ha salido mal ⚠️');
        console.error(error);
      }
    );
  }
}
