import { Component,effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm {
private patientService=inject(PatientService);

name:string='';
age!:number;
disease:string='';
gender:string='';
isEdit=false;
editingId!:number;
constructor(){
  effect(()=>{
    const patient=this.patientService.selectedPatient();
    if(patient){
      this.isEdit=true;
      this.editingId=patient.id;
      this.name=patient.name;
      this.age=patient.age;
      this.gender=patient.gender;
      this.disease=patient.disease;
    }
  });
}
save(){
  if(this.isEdit){
    this.patientService.updatePatient({
      id:this.editingId,
      name:this.name,
      age:this.age,
      gender:this.gender,
      disease:this.disease
    });
  }
  else{
      this.patientService.addPatient({
        name: this.name,
        age: this.age,
        gender: this.gender,
        disease: this.disease,
      })
    }
  this.resetForm();
}
cancel(){
  this.patientService.clearSelection();
  this.resetForm();
}
private resetForm(){
  this.name='';
  this.age=0;
  this.gender='';
  this.disease='';
  this.isEdit=false;
}
}


