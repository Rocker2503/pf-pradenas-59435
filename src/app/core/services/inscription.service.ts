import { Injectable } from "@angular/core";
import { Inscription } from '../../models/inscription';
import { environment } from "../../../environments/environment.development";
import { Observable, of } from "rxjs";
import { Course } from "../../models/course";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class InscriptionService{
    private baseURL = environment.apiBaseUrl;

    constructor(private httpClient: HttpClient){}

    getInscriptionsByUserId(idUser: string): Observable<Inscription[]>{
        return this.httpClient.get<Inscription[]>(
            `${this.baseURL}/inscriptions?${idUser}&_embed=user&_embed=course`
        );
    }

    getAllInscriptions(): Observable<Inscription[]>{
        return this.httpClient.get<Inscription[]>(`${this.baseURL}/inscriptions?_embed=user&_embed=course`);
    }
}