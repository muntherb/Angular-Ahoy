import { Component, OnInit } from '@angular/core';
import { Voice } from '../voice';
import { VoiceService } from '../voice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  voices: Voice[] = [];

  constructor(private voiceService: VoiceService) { }

  ngOnInit() {
    this.getVoices();
  }

  getVoices(): void {
    this.voiceService.getVoices().then((voices: any) => this.voices = voices.length > 1 ? voices.slice(1, 5) : voices)
  }

  play(voice: Voice){
    let url = `../../assets/VoiceFile${voice.text}.wav`
    var audio = new Audio(url);
    audio.play();
  }
}


