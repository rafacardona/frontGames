import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: any;
  name: string | undefined;
  email: string | undefined;
  roll: string | undefined;
  img: string | undefined;

  constructor(){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  
}
