import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectSelectedPatient } from '../store/patient.selectors';
import * as PatientActions from '../store/patient.actions';
import { Patient } from '../patient.module';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-patient-form',
    imports: [ ReactiveFormsModule],
    templateUrl: './patient-form.html',
    styleUrl: './patient-form.css',
})
export class PatientForm {
    private store = inject(Store);
    private fb = inject(FormBuilder);
    selectedpatient = toSignal(this.store.select(selectSelectedPatient), { initialValue: null });
    isEdit = false;
    editingId: number | null = null;
    form = this.fb.nonNullable.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        age: [0, [Validators.required, Validators.min(1)]],
        gender: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        disease: ['', Validators.required],
    })
    handlePatient(patient: Patient | null) {
        if (patient) {
            this.form.patchValue(patient);
            this.isEdit = true;
            this.editingId = patient.id;
        } else {
            this.resetForm();
        }
    }

constructor(){
    effect(()=>{
        const patient=this.selectedpatient();
        this.handlePatient(patient);
    });
}
save() {
    if (this.form.invalid) return;
    const formValue = this.form.getRawValue();
    if (this.isEdit) {
        const updatedPatient: Patient = {
            id: this.editingId!,
            ...(formValue),
        }
        this.store.dispatch(PatientActions.updatePatient({ patient: updatedPatient }));
    } else {
        const newPatient:Omit<Patient,'id'>={...formValue};
        this.store.dispatch(PatientActions.AddPatient({ patient:newPatient }));
    }
    this.resetForm();
}

    private resetForm() {
    this.form.reset();
    this.isEdit = false;
    this.editingId = null;
    this.store.dispatch(PatientActions.selectPatient({patient:null}))
}

cancel() {
    this.store.dispatch(PatientActions.selectPatient({ patient: null }));
    this.resetForm();
};
}


