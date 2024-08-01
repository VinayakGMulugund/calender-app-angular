import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../shared/models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../shared/services/appointment.service';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { FilterService } from '../shared/services/filter.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, OnDestroy {
  times: string[] = [];
  events: Event[] = [];
  currentDate: Date = new Date();

  public filteredEvents: Event[] = [];
  
  private subscriptions$ = new Subscription();

  constructor(private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? 'AM' : 'PM';
      this.times.push(`${hour}:00 ${period}`);
    }
    this.fetchEvents();
    this.subscriptions$.add(this.appointmentService.appointmentServiceSubject.subscribe((events) => {
      this.fetchEvents();
    }));

    this.filterService.selectedDateChange.subscribe((date: Date) => {
      this.currentDate = date;
      this.fetchEvents();
    })
  }

  private fetchEvents(): void {
    this.subscriptions$.add(
      this.appointmentService.getAllAppointments().subscribe({
        next: (events: Event[]) => {
          this.events = events.filter((event) => {
            const eventDate = (new Date(event.time)).setHours(0, 0, 0, 0);
            const currentDate = this.currentDate.setHours(0,0,0,0);
            return eventDate === currentDate;
          })
        },
        error: e => console.log(e)
      })
    );
  }



  public getFilteredEvents(time: string): Event[] {
    return this.events.filter(event => {
      return this.convertEpochToTime(event.time) === time
    });
  }

  public drop(event, containerTimeString?: string): void {
    if (event.previousContainer === event.container) {
      return;
    } else {
      const updateTimestamp = this.changeHourInTimestamp(this.currentDate.getMilliseconds(), containerTimeString);
      const eventItem: Event = event.item.data;
      eventItem.time = updateTimestamp;
    }
  }

  private convertEpochToTime(epoch: number): string {
    const date = new Date(epoch);
  
    let hours = date.getHours();
    
    const period = hours < 12 ? 'AM' : 'PM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    const formattedMinutes = '00';
  
    return `${hours}:${formattedMinutes} ${period}`;
  }

  private convertTimeStringToHours(time: string): number {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
  
    let adjustedHours = hours;
    if (period === 'PM' && hours < 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0;
    }
    return adjustedHours;
  }
  changeHourInTimestamp(originalTimestamp: number, timeString: string): number {
    const newHour = this.convertTimeStringToHours(timeString);
  
    const date = new Date(originalTimestamp);
    date.setHours(newHour);
    return date.getTime();
  }

  openViewAppointmentDialog(event: Event): void {
    this.dialog.open(ViewAppointmentComponent, {
      width: '400px',
      data: event
    });
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
