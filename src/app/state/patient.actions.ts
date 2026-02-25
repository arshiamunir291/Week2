import { createAction,props } from "@ngrx/store";
import { Patient } from "../patient.module";
export const loadPatients=createAction(
    '[Patient] Load Patients'
);
export const loadPatientsSuccess=createAction(
    '[Patient] Load Patients Success',
    props<{patients:Patient[]}>()
)
export const loadPatientsFailure=createAction(
    '[Patient] Load Patient Failure',
    props<{error:any}>()
)
export const selectPatient=createAction(
    '[Patient] Select Patient',
    props<{patient:Patient | null}>()
)
export const AddPatient=createAction(
    '[Patient] Add Patient',
    props<{patient:Patient}>()
)
export const updatePatient=createAction(
    '[Patient] Update Patient',
    props<{patient:Patient | null}>()
)
export const deletePatient=createAction(
    '[Patient] Delete Patient',
    props<{id:number}>()
)