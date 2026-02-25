import { createFeatureSelector,createSelector, State } from "@ngrx/store";
import { PatientState } from "./patient.reducer";

export const selectPatientState=createFeatureSelector<PatientState>('patients');
export const selectAllPatients=createSelector(
    selectPatientState,
    state=>state.list
);
export const selectSelectedPatient=createSelector(
    selectPatientState,
    state=>state.selected
);