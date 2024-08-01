import { Component, EventEmitter, Output } from '@angular/core';
import { FilterService } from '../../shared/services/filter.service';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {

  selectedDate: Date;

  constructor(private filterService: FilterService) {
    this.selectedDate = new Date();
  }

  onChange(event): void {
    this.filterService.selectedDateChanged(event);
  }

  clearDate(): void {
    this.selectedDate = null;
  }
}
