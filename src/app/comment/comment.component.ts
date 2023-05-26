import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  idUser: number = 0;
  @Input() id: any;
  comments: any[] = [];
  textNewComment: string = "";
  sub!: Subscription;

  constructor(private gameService: GameService) {
   
  }

  ngOnInit(): void {
    console.log('di>>',this.id);
    this.gameService.getCommentsGame(this.id).subscribe({
      next: response => {
        console.log('respuesta obtener commnets',response, 'id', this.id);
        this.comments = response.data;
        this.id = response.data.game_id;  
      }
    });

  }
}
