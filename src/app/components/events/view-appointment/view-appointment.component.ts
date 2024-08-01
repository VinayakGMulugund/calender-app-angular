import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../../shared/services/appointment.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.css',
})
export class ViewAppointmentComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private appointmentService: AppointmentService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  convertTimestampToHHMMAMPM(timestamp: number): string {
    const date = new Date(timestamp);
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    const period = hours < 12 ? 'AM' : 'PM';
  
    hours = hours % 12; 
    hours = hours ? hours : 12; 

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${hours}:${formattedMinutes} ${period}`;
  }

  public deleteAppointment() {
    this.appointmentService.deleteAppointment(this.data).subscribe(() => {
      this.appointmentService.eventsChanged();
      this.onClose();
    });
  }
}
