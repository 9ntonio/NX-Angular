import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './card.component';
import { ImageService } from '../services/image.service';

describe('CardComponent', () => {

    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let imageService: ImageService;

    // Mock user data matching the type definition in component
    const mockUser = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: {
            street: 'Test Street',
            suite: 'Suite 123',
            city: 'Test City',
            zipcode: '12345',
            geo: {
                lat: '0',
                lng: '0'
            }
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
            name: 'Test Company',
            catchPhrase: 'Test Catchphrase',
            bs: 'Test BS'
        },
        isFavorite: false
    };

    // Mock image URL for testing
    const mockImageUrl = 'https://test-image-url.com/image.jpg';

    beforeEach(async () => {

        // Configure the testing module
        await TestBed.configureTestingModule({
            imports: [
                CardComponent,
                RouterModule,
                MatCardModule,
                MatButtonModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ImageService,
                    useValue: {
                        getUniqueRandomImage: () => mockImageUrl
                    }
                },
                provideRouter([])
            ]
        }).compileComponents();

        // Get the ImageService instance
        imageService = TestBed.inject(ImageService);

        // Create the component
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;

        // Set the required user input
        component.user = mockUser;

        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should display user information', () => {

        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain(mockUser.name);
        expect(compiled.textContent).toContain(mockUser.username);
        expect(compiled.textContent).toContain(mockUser.email);

    });

    it('should emit favoriteToggled event when favorite button is clicked', () => {

        const emitSpy = jest.spyOn(component.favoriteToggled, 'emit');
        component.onFavoriteClick();
        expect(emitSpy).toHaveBeenCalledWith(mockUser.id);

    });

    it('should get random image URL in constructor', () => {

        const spy = jest.spyOn(imageService, 'getUniqueRandomImage');

        // Create new instance to test constructor
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;

        expect(spy).toHaveBeenCalled();
        expect(component.randomImageUrl).toBe(mockImageUrl);

    });

    it('should return the same image URL for multiple calls to randomImageUrl getter', () => {

        const firstCall = component.randomImageUrl;
        const secondCall = component.randomImageUrl;
        expect(firstCall).toBe(secondCall);
        expect(firstCall).toBe(mockImageUrl);

    });

});
