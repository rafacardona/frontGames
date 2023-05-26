import { Injectable } from "@angular/core";
import { ICharacter } from "./character";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, NEVER, Observable, tap, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class GameService {
    private urlApi: string = "http://127.0.0.1:8000/api"
    private urlGames: string = this.urlApi + "/juegos";
    private urlComments: string = this.urlApi + "/juegos/mostrarComentarios/";
    private urlRatingGame: string = this.urlApi + "/juegos/mostrarValoracion/";
    private next: string = "";
    private previus: string = "";


    constructor(private http: HttpClient) { }

    getGames(): Observable<any> {
        return this.http.get<any>(this.urlGames);
    }

    getCommentsGame(idGame: number): Observable<any> {
        return this.http.get<any>(this.urlComments + idGame);
    }

    setNewComment(idGame: number, idUser: number, comment: any): Observable<any> {
        return this.http.post<any>(this.urlGames + "/" + idGame + "/comentar/" + idUser, comment);
    }

    getRatingGame(idGame: number): Observable<any> {
        return this.http.get<any>(this.urlRatingGame + idGame);
    }

    setRaingGame(idGame: number, idUser: number, points: any): Observable<any> {
        return this.http.post<any>(this.urlGames+ "/" + idGame + "/valorar/" + idUser, points)
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => 'Error encontrado rey ->' + errorMessage);
    }



    // getNextPage(next: string): Observable<any> {
    //     if (next !== null) {
    //         this.next = next;
    //         return this.http.get<any>(this.next);
    //     } else {
    //         alert('La url no es valida');
    //         return this.getPreviusPage(this.urlGames);
    //     }
    // }

    // getPreviusPage(previus: string): Observable<any> {
    //     if (previus !== null) {
    //         return this.http.get<any>(previus).pipe(
    //             tap(data => console.log('All', JSON.stringify(data))),
    //             catchError(this.handleError)
    //         )
    //     } else {
    //         alert('La url no es valida');
    //         return this.getNextPage(this.urlGames);
    //     }
    // }
}