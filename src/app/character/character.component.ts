import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICharacter } from './character';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  characters: ICharacter[] = [];
  errorMessage: ErrorEvent | undefined;
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.sub = this.characterService.getCharacter().subscribe({
      next: characters => {
        this.characters.push(characters);
      },
      error: err => this.errorMessage = err
    });
    console.log(this.characters);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  nextPage(nextUrl: string): void {
    this.characters = [];
    this.sub = this.characterService.getNextPage(nextUrl).subscribe({
      next: characters => {
        this.characters.push(characters)
      }
    })
  }

  previusPage(previusUrl: string): void {
    this.characters = [];
    this.sub = this.characterService.getPreviusPage(previusUrl).subscribe({
      next: characters => {
        this.characters.push(characters);
        console.log(characters);
      }
    })
  }
}
