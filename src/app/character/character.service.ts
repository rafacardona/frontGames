import { Injectable } from "@angular/core";
import { ICharacter } from "./character";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, NEVER, Observable, tap, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class CharacterService {
    private url: string = "https://rickandmortyapi.com/api/character";
    private next: string = "";
    private previus: string = "";

    constructor(private http: HttpClient) { }

    getCharacter(): Observable<ICharacter> {
        return this.http.get<ICharacter>(this.url)
    }


    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => 'Error encontrado rey ->' + errorMessage);
    }

    getNextPage(next: string): Observable<ICharacter> {
        if (next !== null) {
            this.next = next;
            return this.http.get<ICharacter>(this.next);
        } else {
            alert('La url no es valida');
            return this.getPreviusPage(this.url);
        }
    }

    getPreviusPage(previus: string): Observable<ICharacter> {
        if (previus !== null) {
            return this.http.get<ICharacter>(previus).pipe(
                tap(data => console.log('All', JSON.stringify(data))),
                catchError(this.handleError)
            )
        } else {
            alert('La url no es valida');
            return this.getNextPage(this.url);
        }
    }
}