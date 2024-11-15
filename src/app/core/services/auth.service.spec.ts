import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthData } from "../../models/authdata";
import { Student } from "../../models/student";
import { AuthService } from "./auth.service";
import { NavigationExtras, Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { MockProvider } from 'ng-mocks';


const testUser: Student = {
    id: "ADM1",
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@mail.com",
    password: "admin",
    type: "admin",
    token: "asdsafdhsfksdfhsdfjsddfgjksdf",
    createdAt: new Date(),
};

const testData: AuthData = {
    email: "admin@mail.com",
    password: "admin",
}

const testDataError: AuthData ={
    email: "fake@mail.com",
    password: "123456"
}

describe('AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;
    let router: Router;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,
                MockProvider(Router, {
                    navigate: (commands: any[], extras?: NavigationExtras) => {
                        return new Promise((res) => res(true))
                    },
                }),
            ],
        });

        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        localStorage.clear();
    });

    it('El servicio debe estar definido', () => {
        expect(service).toBeTruthy();
    });

    it('Al realizar el login, se debe establecer el token en el localStorage', (done) => {
        service.login(testData).subscribe({
            next: (user) => {
                expect(user).toEqual(testUser);
                expect(localStorage.getItem('token')).toEqual(testUser.token);
                done();
            }
        });
        const mockReq = httpController.expectOne({
            url: `${service['baseURL']}/users?email=${testData.email}&password=${testData.password}`,
            method: 'GET'
        });
        mockReq.flush([testUser]);
    });

    it('Debe retornar un error al realizar un login invalido', (done) => {
        service.login(testDataError).subscribe({
          error: (err) => {
            expect(err).toBeInstanceOf(Error);
            expect(err['message']).toBe('Los datos son invalidos');
            done()
          },
        });
    
        const mockReq = httpController.expectOne({
          url: `${service['baseURL']}/users?email=${testDataError.email}&password=${testDataError.password}`,
          method: 'GET',
        });
        // mockReq.flush([], { status: 401, statusText: 'Unauthorized' });
        mockReq.flush([]);
    });

    it('Logout debe remover el token del localStorage, se debe quitar el usuario logeado y redirigir al auth/login', (done) => {
        const spyOnNavigate = spyOn(router, 'navigate');

        service.login(testData).subscribe();
        const mockReq = httpController.expectOne({
            url: `${service['baseURL']}/users?email=${testData.email}&password=${testData.password}`,
            method: 'GET'
        });
        mockReq.flush([testUser]);

        service.logout();
        expect(localStorage.getItem('token')).toBeNull();
        service.authUser$.subscribe({
            next: (user) => {
                expect(user).toBeNull();
                done();
            }
        })

        expect(spyOnNavigate).toHaveBeenCalledOnceWith(['auth', 'login']);
    });

});