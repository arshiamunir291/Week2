import { Injectable, signal } from '@angular/core';
import { PatientType } from './service.module';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private _patients= signal<PatientType[]>([
    {id:'p1',name:'Ali',age:21,gender:'Male',disease:'Heart'},
    {id:'p2',name:'Ahmad',age:25,gender:'Male',disease:'Lungs'},
    {id:'p3',name:'Alina',age:15,gender:'Female',disease:'Stomach'},
    {id:'p4',name:'Badar',age:35,gender:'Male',disease:'Heart'},
    {id:'p5',name:'Bushra',age:45,gender:'Female',disease:'Kidney'},
    {id:'p6',name:'Arman',age:21,gender:'Male', disease:'Heart'},
    {id:'p7',name:'Alyan',age:30,gender:'Male',disease:'Lungs'},
  ]);
  patients=this._patients.asReadonly();
  private _selectedPatient=signal<PatientType | null> (null);
  selectedPatient=this._selectedPatient.asReadonly();

  clearSelection():void{
    this._selectedPatient.set(null);
  }
    selectPatient(patient:PatientType):void{
   this._selectedPatient.set(patient);
  }

    // addPatient(patient:PatientType):void{
  //  this._patients.update(list=>[...list,patient])
  // }

  // updatePatient(updated:PatientType):void{
  //   this._patients.update(list=>list.map(p=>(p.id === updated.id? updated:p)));
  // }
  // deletePatient(id:string):void{
  //   this._patients.update(list=>list.filter(p=>p.id !==id));
  // }



}
