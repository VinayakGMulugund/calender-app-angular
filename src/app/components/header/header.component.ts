import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentComponent } from './appointment/appointment.component';
import { Event } from '../shared/models/event.model';
import { AppointmentService } from '../shared/services/appointment.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {}
  openAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAppointment(result);
      }
    });
  }

  addAppointment(appointment): void {
    const newEvent: Event = {
      title: appointment.title,
      time: this.combineDateAndTime(appointment.date, appointment.time),
      desc: appointment.desc
    };
    this.appointmentService.createAppointment(newEvent).subscribe(() => {
    });
  }

  private combineDateAndTime(date: string, time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    const dateObj = new Date(date);
    dateObj.setHours(hours, minutes, 0, 0);
    return dateObj.getTime();
  }
}
