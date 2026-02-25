import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Patient } from '../patient.module';
import { loadPatients, selectPatient } from '../state/patient.actions';
import { selectAllPatients } from '../state/patient.selectors';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-patient-list',
  imports: [AsyncPipe,],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  private store=inject(Store);
  patients$:Observable<Patient[]>=this.store.select(selectAllPatients);
  constructor(){
    this.store.dispatch(loadPatients())
  }
  selectPatientFromList(patient:Patient){
    this.store.dispatch(selectPatient({patient}));
  }

}
