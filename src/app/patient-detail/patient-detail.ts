import { Component,inject } from '@angular/core';
import { PatientType } from '../service.module';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-detail',
  imports: [],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css',
})
export class PatientDetail {
  // Older way through dependency injection
  // constructor(private patientService:PatientService){}

  patients=inject(PatientService);//new way from angular 16
  currentPatient:PatientType | null=null;

  ngOnInit(){
    this.patients.selectedPatient$.subscribe(patient=>
       this.currentPatient= patient
      );
  }

}
