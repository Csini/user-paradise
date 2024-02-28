import { Injectable, signal } from '@angular/core';

@Injectable()
export class ShortcutService {

  keyboardkey = signal<string | null>(null);

  constructor() { }

  reset() : void{
    this.keyboardkey.set(null);
  }
}
