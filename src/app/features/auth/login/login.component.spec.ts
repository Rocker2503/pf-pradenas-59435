import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component"
import { HttpClientTestingModule, provideHttpClientTesting } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { MockProvider } from 'ng-mocks';
import { AuthService } from "../../../core/services/auth.service";
import { of } from "rxjs";




describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [
                provideHttpClientTesting, 
                MockProvider(AuthService, 
                    {login() { 
                        return of();
                    },
                }
            )],
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('El componente debe de ser instanciado', () => {
        expect(component).toBeTruthy();
    });

    it('el campo email debe ser requerido', () => {
        const emailControl = component.loginForm.get('email');
        emailControl?.setValue('');
        expect(emailControl?.hasError('required')).toBeTrue();
    });

    it('Al enviar el formulario (submit) si los datos son incorrectos deben ser marcados como touched', () => {
        component.loginForm.setValue({
            email: '',
            password: ''
        });

        const spyMarkAllTouched = spyOn(
            component.loginForm,
            'markAllAsTouched'
        )

        component.onSubmit();

        expect(spyMarkAllTouched).toHaveBeenCalled();
    });

    it('Al llamar a la funcion onSubmit, se debe llamar al AuthService de la funcion doLogin', () => {
        component.loginForm.setValue({
            email: 'admin@mail.com',
            password: 'admin'
        });

        const spyLogIn = spyOn(component, 'doLogin');
        component.onSubmit();

        expect(spyLogIn).toHaveBeenCalled();
    });
});