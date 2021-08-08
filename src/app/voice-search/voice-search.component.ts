import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Voice } from '../voice';
import { VoiceService } from '../voice.service';


@Component({
  selector: 'app-voice-search',
  templateUrl: './voice-search.component.html',
  styleUrls: [ './voice-search.component.css' ]
})
export class VoiceSearchComponent implements OnInit {
  voices$!: Observable<Voice[]>;
  private searchTerms = new Subject<string>();

  constructor(private voiceService: VoiceService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.voices$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.voiceService.searchVoices(term)),
    );
  }
}


