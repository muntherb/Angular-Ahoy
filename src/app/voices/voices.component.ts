import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Voice } from '../voice';
import { VoiceService } from '../voice.service'

@Component({
  selector: 'app-voices',
  templateUrl: './voices.component.html',
  styleUrls: ['./voices.component.css']
})
export class VoicesComponent implements OnInit {
  voices: any = [];
  index: number = 0;
  text: string = '';
  clickedfile: string = ''
  @ViewChild('myForm', {static: false}) myForm!: NgForm;
  constructor(private voiceService: VoiceService) {
   }

  ngOnInit() {
    this.getVoices();
  }



  getVoices() {
    this.voiceService.getVoices().then((data: any) => this.voices = data)
  }

  addVoice() {
    if (!this.text.trim()) {
      // if not search term, return empty voice array.
      return '';
    }
    let exists = false;
    if(this.voices.map((voice: any) => {(voice.text === this.text? exists = true : '')}))
    if(exists) return this.play(this.text)
    let Voice: Voice = {
     id: this.voices.length | 0,
     text: this.text,
     file: '' 
    }
    this.voiceService.addVoice(Voice)
    this.voices = [...this.voices, Voice]
  }


  play(voice: any) {
    this.clickedfile = typeof voice === 'string' ? voice : voice.text
    let x = <HTMLSourceElement>document.getElementById('source')
    let url = `../../assets/VoiceFile${this.clickedfile}.wav`
    x?.setAttribute( 'src', url);
    let y = <HTMLAudioElement>document.getElementById('audio')
    y?.load();
    return this.myForm.resetForm();
  }
  deleteVoice(id: number, text: string) {
    this.voiceService.deleteVoice(text)
    this.voices.splice(id, 1)
  }

}



