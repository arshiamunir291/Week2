import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm {
  private patientService = inject(PatientService);

  name = signal<string>('');
  age = signal<number | null>(null);
  disease = signal<string>('');
  gender = signal<string>('');
  isEdit = signal<boolean>(false);
  editingId = signal<number | null>(null);

  constructor() {
    effect(() => {
      const patient = this.patientService.selectedPatient();
      if (patient) {
        this.name.set(patient.name);
        this.age.set(patient.age);
        this.disease.set(patient.disease);
        this.gender.set(patient.gender);
        this.isEdit.set(true);
        this.editingId.set(patient.id);
      }
    });
  }
  isValid = computed(() => {
    return (
      this.name().trim() &&
      this.age() !== null &&
      this.gender().trim() &&
      this.disease().trim()
    )
  })

  save() {
    if (!this.isValid()) return;
    const loadPatient = {
      name: this.name(),
      age: this.age()!,
      gender: this.gender(),
      disease: this.disease(),
    }
    if (this.isEdit()) {
      const updated = { id: this.editingId()!, ...loadPatient };
      this.patientService.updatePatient(updated);
      this.patientService.selectPatient(updated);

    } else {
      this.patientService.addPatient(loadPatient);
    }
    this.resetForm();
  }

  private resetForm() {
    this.name.set('');
    this.age.set(0);
    this.gender.set('');
    this.disease.set('');
    this.isEdit.set(false);
  }

  cancel() {
    this.patientService.clearSelection();
    this.resetForm();
  };
  setAge(value: string) {
    this.age.set(value ? Number(value) : 0);
  }
}


