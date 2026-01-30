import { Component,inject, signal } from '@angular/core';
import { PatientType } from '../service.module';
import { PatientService } from '../patient-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-detail',
  imports: [CommonModule],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css',
})
export class PatientDetail {
  // Older way through dependency injection
  // constructor(private patientService:PatientService){}

  patients=inject(PatientService);//new way from angular 16
  currentPatient=this.patients.selectedPatient;
}
