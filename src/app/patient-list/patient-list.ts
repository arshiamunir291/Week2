import { Component, computed, inject } from '@angular/core';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-list',
  imports: [],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  patients = inject(PatientService)
  patientList = this.patients.patients;

}
