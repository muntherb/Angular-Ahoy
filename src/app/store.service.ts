import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Voice } from './voice';
 
@Injectable({ providedIn: 'root' })
export class VoiceStoreService extends EntityCollectionServiceBase<Voice> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Voice', serviceElementsFactory);
  }
}