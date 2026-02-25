import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectSelectedPatient } from '../state/patient.selectors';
import * as PatientActions from '../state/patient.actions';
import { Patient } from '../patient.module';


@Component({
    selector: 'app-patient-form',
    imports: [CommonModule, FormsModule],
    templateUrl: './patient-form.html',
    styleUrl: './patient-form.css',
})
export class PatientForm {

    private store = inject(Store);

    first_name = signal<string>('');
    last_name = signal<string>('');
    age = signal<number | null>(null);
    gender = signal<string>('');
    email = signal<string>('');
    country = signal<string>('');
    disease = signal<string>('');
    isEdit = signal<boolean>(false);
    editingId = signal<number | null>(null);

    constructor() {
        this.store.select(selectSelectedPatient).subscribe(patient => {
            if (patient) {
                this.first_name.set(patient.first_name);
                this.last_name.set(patient.last_name);
                this.age.set(patient.age);
                this.gender.set(patient.gender);
                this.email.set(patient.email);
                this.country.set(patient.country);
                this.disease.set(patient.disease);
                this.isEdit.set(true);
                this.editingId.set(patient.id);
            } else {
                this.resetForm();
            }
        })
    }
    isValid = computed(() => {
        return (
            this.first_name().trim() &&
            this.last_name().trim() &&
            this.age() !== null &&
            this.gender().trim() &&
            this.email().trim() &&
            this.country().trim() &&
            this.disease().trim()
        )
    })

    save() {
        if (!this.isValid()) return;
        const patientData: Patient = {
            id: this.editingId()!,
            first_name: this.first_name(),
            last_name: this.last_name(),
            age: this.age()!,
            gender: this.gender(),
            email: this.email(),
            country: this.country(),
            disease: this.disease(),
        }
        if (this.isEdit()) {
            this.store.dispatch(PatientActions.updatePatient({ patient: patientData }));
            this.store.dispatch(PatientActions.selectPatient({ patient: patientData }));

        } else {
            const patientData: Omit<Patient, 'id'> = {
                first_name: this.first_name(),
                last_name: this.last_name(),
                age: this.age()!,
                gender: this.gender(),
                email: this.email(),
                country: this.country(),
                disease: this.disease(),
            };
            this.store.dispatch(PatientActions.AddPatient({ patient: patientData as Patient }));
        }
        this.resetForm();
    }

    private resetForm() {
        this.first_name.set('');
        this.last_name.set('');
        this.age.set(0);
        this.gender.set('');
        this.email.set('');
        this.country.set('');
        this.disease.set('');
        this.isEdit.set(false);
    }

    cancel() {
        this.store.dispatch(PatientActions.selectPatient({ patient: null }));
        this.resetForm();
    };
    setAge(value: string) {
        this.age.set(value ? Number(value) : 0);
    }
}


