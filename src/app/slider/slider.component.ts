import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  topVoteGames: any;
  allGames: any;
  slideConfig: {} = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: response => {
        this.allGames = response;
      }
    });
  }
}
