import { Component, signal } from '@angular/core';
import { PatientDetail } from './patient-detail/patient-detail';
import { PatientList } from './patient-list/patient-list';
import { PatientForm } from './patient-form/patient-form';
@Component({
  selector: 'app-root',
  imports: [PatientDetail,PatientList,PatientForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
