import { createReducer,on } from "@ngrx/store";
import { Patient } from "../patient.module";
import * as PatientActions from './patient.actions';
export interface PatientState{
    list:Patient[];
    selected:Patient|null;
    loaded:boolean;
    error:any;
}
export const initialState:PatientState={
    list:[],
    selected:null,
    loaded:false,
    error:null
}
export const patientReducer=createReducer(
    initialState,
    on(PatientActions.loadPatients,(state=>({
       ...state,
       loading:true 
    }))),
    on(PatientActions.loadPatientsSuccess,(state,{patients})=>({
        ...state,
        list:patients,
        loaded:true
    })),
    on(PatientActions.loadPatientsFailure,(state,{error})=>({
        ...state,
        error
    })),
    on(PatientActions.selectPatient,(state,{patient})=>({
        ...state,
        selected:patient
    })),
    on(PatientActions.AddPatient,(state,{patient})=>({
        ...state,
        list:[...state.list,patient]
    })),
    on(PatientActions.updatePatient,(state,{ patient })=>({
        ...state,
        list:state.list.map(p=>p.id===patient?.id? {...p,...patient}:p)
    })),
    on(PatientActions.deletePatient,(state,{id})=>({
        ...state,
        list:state.list.filter(p=>p.id!==id),
        selected:null
    })),
)