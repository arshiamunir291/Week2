import { Component, signal } from '@angular/core';
import { PatientDetail } from './patient-detail/patient-detail';
import { PatientList } from './patient-list/patient-list';

@Component({
  selector: 'app-root',
  imports: [PatientDetail,PatientList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
