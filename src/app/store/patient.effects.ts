import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Patient } from "../patient.module";
import { catchError, map, mergeMap } from "rxjs";
import * as PatientActions from './patient.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";

@Injectable()
export class PatientEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpClient);
    private apiUrl = "http://localhost:3000/patients";

    loadPatients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.loadPatients),
            mergeMap(() =>
                this.http.get<Patient[]>(this.apiUrl)
                    .pipe(
                        map(patients =>
                            PatientActions.loadPatientsSuccess({ patients })
                        ),
                        catchError(error => of(PatientActions.loadPatientsFailure({ error })))
                    )
            )
        )
    )
    addPatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.AddPatient),
            mergeMap(action =>
                this.http.post<Patient>(this.apiUrl, action.patient).pipe(
                    map((newPatient) => PatientActions.addPatientSuccess({patient:newPatient})),
                    catchError(error =>
                        of(PatientActions.loadPatientsFailure({ error }))
                    )
                )
            )
        )
    )
    updatePatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.updatePatient),
            mergeMap(({patient}) =>
                this.http.put<Patient>(
                    `${this.apiUrl}/${patient.id}`,
                    patient).pipe(
                        map((updated) => PatientActions.updatePatientSuccess({patient:updated})),
                        catchError(error => of(PatientActions.loadPatientsFailure({ error })))
                    )
            )
        )
    )
    deletePatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.deletePatient),
            mergeMap(({id}) =>
                this.http.delete(`${this.apiUrl}/${id}`).pipe(
                    map(() => PatientActions.deletePatientSuccess({id})),
                    catchError(error =>
                        of(PatientActions.loadPatientsFailure({ error }))
                    )
                )
            )
        )
    )
} 