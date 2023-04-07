import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { ICharacter } from './character';
import { CharacterService } from './character.service';
import { Parser } from '@angular/compiler';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  urlNext = '';
  urlPrevious = '';
  characters: any[] = [];
  errorMessage: ErrorEvent | undefined;
  private _characterFilter: string = '';
  filteredCharacter: any[] = [];


  constructor(private characterService: CharacterService) { }

  get characterFilter() {
    return this._characterFilter;
  }

  set characterFilter(value: string) {
    this._characterFilter = value;
    this.filteredCharacter = this.perfomFilter(value);
    console.log('In setter:', this.filteredCharacter, ' + el privao: ', this._characterFilter, ' el value es: ', value);
  }

  perfomFilter(filterBy: string): ICharacter[] {
    filterBy = filterBy.toLocaleLowerCase();
    console.log('filtraso:', filterBy);
    this.characters.map(c => console.log(c.name.includes(filterBy)));
    return this.characters.filter(character => character.name.toLocaleLowerCase().includes(filterBy));
  }



  ngOnInit(): void {
    this.sub = this.characterService.getCharacter().subscribe({
      next: response => {
        this.urlNext = response.info.next;
        this.urlPrevious = response.info.prev;

        this.characters = response.results;
        this.filteredCharacter = [...this.characters];
      },
      error: err => this.errorMessage = err
    });
    //console.log(this.characters);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  nextPage(): void {
    this.characters = [];
    this.sub = this.characterService.getNextPage(this.urlNext).subscribe({
      next: response => {
        console.log(response);

        this.urlNext = response.info.next;
        this.urlPrevious = response.info.prev;
        this.characters = response.results;
        this.filteredCharacter = [...this.characters];
        console.log(this.urlNext, response.info.urlNext);
      }
    });
  }

  previusPage(): void {
    this.characters = [];
    this.sub = this.characterService.getPreviusPage(this.urlPrevious).subscribe({
      next: response => {
        this.urlNext = response.info.next;
        this.urlPrevious = response.info.next;
        this.characters = response.results;
        this.filteredCharacter = [...this.characters];
      }
    })
  }
}
