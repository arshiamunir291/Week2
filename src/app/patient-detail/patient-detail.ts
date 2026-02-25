import { Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Patient } from '../patient.module';
import { selectSelectedPatient } from '../store/patient.selectors';
import { deletePatient, selectPatient } from '../store/patient.actions';

@Component({
  selector: 'app-patient-detail',
  imports: [CommonModule],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.css',
})
export class PatientDetail {
  private store = inject(Store);


  currentPatient$: Observable<Patient | null> = this.store.select(selectSelectedPatient);
  clearSelection(){
    this.store.dispatch(selectPatient({patient:null}));
  }
  hasPatient$: Observable<boolean> = this.currentPatient$.pipe(map(patient => !!patient));
  deleteCurrentPatient(patient: Patient | null) {
    if (!patient) return;
    this.store.dispatch(deletePatient({ id: patient.id }));
  }
}
