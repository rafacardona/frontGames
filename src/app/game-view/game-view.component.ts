import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game/game.service';
import { Subscription } from 'rxjs';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  gameId: number = 0;
  games: any[] = [];
  errorMessage: any;
  textArea: string = "";
  idUser: number = 0;
  userData: any;
  userObject: any;
  ratingValueGames: any;
  avgGame: number = 0;
  totalVotes: any;
  voteSelect: any;
  isLogged: boolean = false;
  usersVotesGame: any;
  isVote: boolean = false;

  constructor(private routeActive: ActivatedRoute, private gameService: GameService, private route: Router, private location: Location) {
    this.routeActive.params.subscribe(params => {
      this.gameId = params['id'];
    });

  }

  ngOnInit(): void {
    this.sub = this.gameService.getGames().subscribe({
      next: response => {
        this.games = response.data;
      },
      error: err => this.errorMessage = err
    });

    this.gameService.getRatingGame(this.gameId).subscribe({
      next: response => {
        this.ratingValueGames = response.data;
        this.avgGame = this.calcAverageRating();
        this.usersVotesGame = response.data;
        this.checkUserVote();
        
      },
      error: err => this.errorMessage = err
    });
    
    this.userData = localStorage.getItem('user');
    this.userObject = JSON.parse(this.userData);
    this.idUser = this.userObject.id;
    this.isLogged = localStorage.getItem('isLogged') === "yes";
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  calcAverageRating(): number {
    let avg = 0;
    let count = 0;
    for (let i = 0; i < this.ratingValueGames.length; i++) {
      avg += this.ratingValueGames[i].points;
      count++;
    }
   
    this.totalVotes = count;
    return avg / count;
  }

  newComment(): void {
    let comment = { "comment": this.textArea };
    this.gameService.setNewComment(this.gameId, this.idUser, comment).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        console.error('Error al agregar el comentario', error);
      }
    );
  }

  voteGame() {
    let vote = { "points": this.voteSelect };
    this.gameService.setRaingGame(this.gameId, this.idUser, vote).subscribe(
      response => {
        alert(response.message);
        window.location.reload();
      }
    )
  }

  checkUserVote(): void {
    for (let i = 0; i <= this.usersVotesGame.length; i++) {
      if (this.usersVotesGame[i].user_id == this.idUser) {
        this.isVote = true;
        return;
      }
    }
    this.isVote = false;
  }
}
