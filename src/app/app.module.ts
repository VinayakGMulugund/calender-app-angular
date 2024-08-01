import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentService } from './components/shared/services/appointment.service';
import { AppointmentComponent } from './components/header/appointment/appointment.component';
import { EventsComponent } from './components/events/events.component';
import { ViewAppointmentComponent } from './components/events/view-appointment/view-appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { DatePickerComponent } from './components/header/date-picker/date-picker.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    EventsComponent,
    ViewAppointmentComponent,
    HeaderComponent,
    DatePickerComponent,
    HomepageComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatIcon,
    MatDatepicker,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    RouterLink,
    RouterModule,
    DragDropModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [AppointmentService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
