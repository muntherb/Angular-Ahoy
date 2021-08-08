import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, first, map, take, tap } from 'rxjs/operators';

import { Voice } from './voice';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class VoiceService {

  private voicesUrl = 'http://localhost:3000/text';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET voices from the server */
   getVoices()
   {
    var x =  this.http.get(`${this.voicesUrl}/get`).pipe(take(1)).toPromise()
    console.log(x)
    return x
  }

  /** GET voice by id. Return `undefined` when id not found */
  getVoiceNo404<Data>(id: number): Observable<Voice> {
    const url = `${this.voicesUrl}/?id=${id}`;
    return this.http.get<Voice[]>(url)
      .pipe(
        map(voices => voices[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} voice id=${id}`);
        }),
        catchError(this.handleError<Voice>(`getVoice id=${id}`))
      );
  }

  /** GET voice by id. Will 404 if id not found */
  getVoice(id: number): Observable<Voice> {
    const url = `${this.voicesUrl}/${id}`;
    return this.http.get<Voice>(url).pipe(
      tap(_ => this.log(`fetched voice id=${id}`)),
      catchError(this.handleError<Voice>(`getVoice id=${id}`))
    );
  }

  /* GET voices whose name contains search term */
  searchVoices(term: string): Observable<Voice[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Voice[]>(`${this.voicesUrl}/?${term}`).pipe(
      tap(x => x.length ?
         this.log(`found voices matching "${term}"`) :
         this.log(`no voices matching "${term}"`)),
      catchError(this.handleError<Voice[]>('searchVoices', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new voice to the server */
  addVoice(voice: Voice) {
    this.http.post(this.voicesUrl, voice, this.httpOptions).pipe(first()).subscribe((res) => console.log(res)),
    catchError(this.handleError<Voice>('addVoice'));
  }


  /** DELETE: delete the voice from the server */
  deleteVoice(text: string){
    const url = `${this.voicesUrl}/delete`;
    let obj = {'text': text}
    return this.http.post(url, obj, this.httpOptions).pipe(first()).subscribe((res) => console.log(res)),
    catchError(this.handleError<Voice>('addVoice'));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead


      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VoiceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`VoiceService: ${message}`);
  }
}


