import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { PatientType } from './service.module';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patientsSubject= new BehaviorSubject<PatientType[]>([
    {id:'p1',name:'Ali',age:21,gender:'Male',disease:'Heart'},
    {id:'p2',name:'Ahmad',age:25,gender:'Male',disease:'Lungs'},
    {id:'p3',name:'Alina',age:15,gender:'Female',disease:'Stomach'},
    {id:'p4',name:'Badar',age:35,gender:'Male',disease:'Heart'},
    {id:'p5',name:'Bushra',age:45,gender:'Female',disease:'Kidney'},
    {id:'p6',name:'Arman',age:21,gender:'Male', disease:'Heart'},
    {id:'p7',name:'Alyan',age:30,gender:'Male',disease:'Lungs'},
  ]);
  private selectedPatientSubject=new BehaviorSubject<PatientType | null> (null);
  patients$=this.patientsSubject.asObservable();
  selectedPatient$=this.selectedPatientSubject.asObservable();

  constructor(){}

  //CRUD operation
  addPatient(patient:PatientType):void{
    this.patientsSubject.next([
      ...this.patientsSubject.value,patient,
    ]);
  }

  updatePatient(updatedpatient:PatientType):void{
    const updatedList=this.patientsSubject.value.map(p=>p.id === updatedpatient.id? updatedpatient:p);
    this.patientsSubject.next(updatedList);
  }
  deletePatient(id:string):void{
    const filtered=this.patientsSubject.value.filter(p=> p.id !==id);
    this.patientsSubject.next(filtered)
  }

  selectPatient(patient:PatientType){
   this.selectedPatientSubject.next(patient);
  }
  clearSelection():void{
    this.selectedPatientSubject.next(null);
  }
}
