import { Injectable } from "@angular/core";
import { Inscription } from '../../models/inscription';
import { environment } from "../../../environments/environment.development";
import { concatMap, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class InscriptionService{
    private baseURL = environment.apiBaseUrl;

    constructor(private httpClient: HttpClient){}

    getInscriptionsByUserId(idStudent: string): Observable<Inscription[]>{
        console.log("id estudiante: " , idStudent);
        return this.httpClient.get<Inscription[]>(
            `${this.baseURL}/inscriptions?studentId=${idStudent}&_embed=student&_embed=course`
        );
    }

    getAllInscriptions(): Observable<Inscription[]>{
        return this.httpClient.get<Inscription[]>(`${this.baseURL}/inscriptions?_embed=student&_embed=course`);
    }

    createInscription(payload: Omit<Inscription, 'student'| 'course'>): Observable<Inscription>{
        return this.httpClient.post<Inscription>(`${this.baseURL}/inscriptions`, payload);
    }

    updateInscription(id: string, payload: Omit<Inscription, 'student' | 'course'>): Observable<Inscription[]>{
        return this.httpClient.patch<Inscription>(`${this.baseURL}/inscriptions/${id}`, payload).pipe(concatMap(() => this.getAllInscriptions()));
    }

    deleteInscription(id: string): Observable<Inscription[]>{
        return this.httpClient.delete<Inscription>(`${this.baseURL}/inscriptions/${id}`).pipe(concatMap( () => this.getAllInscriptions()));
    }
}