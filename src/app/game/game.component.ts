import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';

import { GameService } from './game.service';
import { Parser } from '@angular/compiler';
import { Router } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  urlNext = '';
  urlPrevious = '';
  games: any[] = [];
  errorMessage: ErrorEvent | undefined;
  private _gameFilter: string = '';
  filteredGame: any[] = [];
  
  idUser: number = 0;
  userData: any;
  userObject: any;
  isLogged: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  get gameFilter() {
    return this._gameFilter;
  }

  set gameFilter(value: string) {
    this._gameFilter = value;
    this.filteredGame = this.perfomFilter(value);
  }

  ngOnInit(): void {
    this.sub = this.gameService.getGames().subscribe({
      next: response => {
        this.games = response.data;
        this.filteredGame = [...this.games];

        this.userData = localStorage.getItem('user');
        this.userObject = JSON.parse(this.userData);
        this.idUser = this.userObject.id;
        this.isLogged = localStorage.getItem('isLogged') === "yes";
      },
      error: err => this.errorMessage = err
    });
  }

  perfomFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.games.filter(game => game.name.toLocaleLowerCase().includes(filterBy));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



  openViewGame(id: number, games: any[]): void {
    this.router.navigate(["/game", id])
  }
}
