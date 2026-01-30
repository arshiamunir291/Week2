import { Component, computed, inject } from '@angular/core';
import { PatientService } from '../patient-service';
import { PatientType } from '../service.module';

@Component({
  selector: 'app-patient-list',
  imports: [],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
patients=inject(PatientService)
patientList=computed(()=>this.patients.patients())

}
