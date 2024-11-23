import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveIndexService {
  constructor() { }

  // private activeIndexSubject = new BehaviorSubject<number | null>(null);
  private activeIndexSubject = new BehaviorSubject<number>(0);
  activeIndex$ = this.activeIndexSubject.asObservable();
  setActiveIndex(index: number): void {//subscribe
    this.activeIndexSubject.next(index);
  }
}
