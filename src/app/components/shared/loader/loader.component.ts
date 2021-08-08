import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 75;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService){}
}