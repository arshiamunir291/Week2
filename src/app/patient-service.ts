import { Injectable, signal } from '@angular/core';
import { PatientType } from './service.module';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private _patients= signal<PatientType[]>([
    {id:1,name:'Ali',age:21,gender:'Male',disease:'Heart'},
    {id:2,name:'Ahmad',age:25,gender:'Male',disease:'Lungs'},
    {id:3,name:'Alina',age:15,gender:'Female',disease:'Stomach'},
    {id:4,name:'Badar',age:35,gender:'Male',disease:'Heart'},
    {id:5,name:'Bushra',age:45,gender:'Female',disease:'Kidney'},
    {id:6,name:'Arman',age:21,gender:'Male', disease:'Heart'},
    {id:7,name:'Alyan',age:30,gender:'Male',disease:'Lungs'},
  ]);
  
  patients=this._patients.asReadonly();
  private _selectedPatient=signal<PatientType | null> (null);
  selectedPatient=this._selectedPatient.asReadonly();
   private nextId=1;
  clearSelection():void{
    this._selectedPatient.set(null);
  }
    selectPatient(patient:PatientType):void{
   this._selectedPatient.set(patient);
  }

    addPatient(patient:Omit<PatientType,'id'>):void{
      const newPatient:PatientType={
        id:this.nextId++,
        ...patient
      }
   this._patients.update(list=>[...list,newPatient])
  }

  updatePatient(updated:PatientType):void{
    this._patients.update(list=>list.map(p=>(p.id === updated.id? updated:p)));
  }
  deletePatient(id:number):void{
    this._patients.update(list=>list.filter(p=>p.id !==id));
  }



}
