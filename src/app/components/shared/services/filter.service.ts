import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  public selectedDateChange = new Subject();

  public selectedDateChanged(date: Date): void {
    this.selectedDateChange.next(date);
  }
}
