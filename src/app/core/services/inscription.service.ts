import { Injectable } from "@angular/core";
import { Inscription } from '../../models/inscription';
import { environment } from "../../../environments/environment.development";
import { Observable, of } from "rxjs";
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
}