import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the app', () => {

        expect(component).toBeTruthy();

    });

    it('should have correct title', () => {

        expect(component.title).toEqual('Antonio Almena');

    });

    it('should render header with correct content', () => {

        const compiled = fixture.nativeElement as HTMLElement;
        const headerText = compiled.querySelector('h1')?.textContent;
        expect(headerText).toContain('Antonio Almena');
        expect(headerText).toContain('I🫀Code');
        expect(headerText).toContain('Design');

    });

    it('should have a router outlet', () => {

        const compiled = fixture.nativeElement as HTMLElement;
        const routerOutlet = compiled.querySelector('router-outlet');
        expect(routerOutlet).toBeTruthy();

    });

});
