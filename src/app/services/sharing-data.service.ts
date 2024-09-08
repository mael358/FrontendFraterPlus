import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmmiter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  private _idUserEventEmmiter: EventEmitter<number> = new EventEmitter<number>();

  private _selectedUserEventEmmiter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  constructor() { }

  get newUserEventEmmiter(): EventEmitter<Usuario> {
    return this._newUserEventEmmiter;
  }

  get idUserEventEmmiter(): EventEmitter<number> {
    return this._idUserEventEmmiter;
  }
}
