import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  userObject: any;
  userData: any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.userId = params['id'];
      console.log(params);
    });
    this.userData = localStorage.getItem('user');
    this.userObject = JSON.parse(this.userData);

    this.name = this.userObject.name;
    this.mail = this.userObject.email;
    this.img = this.userObject.img

    console.log('usuariodddddd', this.userObject);
  }

  activeEditProfile(): void {
    this.editActive = !this.editActive;
  }

}
