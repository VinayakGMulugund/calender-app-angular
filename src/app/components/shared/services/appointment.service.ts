import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public appointmentServiceSubject = new Subject();

  public eventsChanged(): void {
    this.appointmentServiceSubject.next(this.get() || ['test']);
  }

  // DUMMY DATABASE //
  private events: Event[] = [
    {
      title: 'Meeting with Team',
      time: new Date('2024-08-01T10:00:00').getTime(),
      desc: 'Discuss project updates and timelines.',
    },
    {
      title: 'Doctor Appointment',
      time: new Date('2024-08-02T14:30:00').getTime(),
      desc: 'Annual check-up with Dr. Smith.',
    },
    {
      title: 'Project Deadline',
      time: new Date('2024-08-05T17:00:00').getTime(),
      desc: 'Submit the final project report.',
    },
    {
      title: 'Lunch with Client',
      time: new Date('2024-08-06T12:00:00').getTime(),
      desc: 'Lunch at The Olive Garden.',
    },
    {
      title: 'Conference',
      time: new Date('2024-08-10T09:00:00').getTime(),
      desc: 'Attend the annual tech conference.',
    },
  ]

  constructor() {
    this.savedata(this.events);
  }
  private savedata(events) {
    localStorage.setItem('data', JSON.stringify(events));
    this.eventsChanged();
  }

  // CRUD OPERATIONS ON DATABASE //
  public getAllAppointments(): Observable<Event[]> {
    return of(this.get());
  }

  public deleteAppointment(event: Event): Observable<boolean> {
    this.deleteEvent(event.title);
    return of(true);
  } 

  public createAppointment(event: Event): Observable<Event> {
    this.addEvent(event);
    return of(event);
  }

/// BELOW ARE HELPER FUNCTIONS WHICH CHANGE THE DATA IN DATABASE ///
  private get(): Event[] {
    return JSON.parse(localStorage.getItem('data'));
  }

  private addEvent(event: Event): void {
    const events = this.get();
    this.savedata([...events, event])
  }

  private deleteEvent(title: string): void {
    const events = this.get();
    const index = events.findIndex(event => event.title === title);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    this.savedata(this.events)
  }
}