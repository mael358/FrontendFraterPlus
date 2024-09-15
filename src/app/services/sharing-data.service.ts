import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmmiter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  private _idUserEventEmmiter: EventEmitter<number> = new EventEmitter<number>();

  private _findUserByIdEventEmmiter: EventEmitter<number> = new EventEmitter<number>();

  private _selectUserEventEmmiter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  constructor() { }

  get newUserEventEmmiter(): EventEmitter<Usuario> {
    return this._newUserEventEmmiter;
  }

  get idUserEventEmmiter(): EventEmitter<number> {
    return this._idUserEventEmmiter;
  }

  get findUserByIdEventEmmiter(): EventEmitter<number> {
    return this._findUserByIdEventEmmiter;
  }

  get selectUserEventEmmiter(): EventEmitter<Usuario> {
    return this._selectUserEventEmmiter;
  }
}
