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

    const mockImageUrl = 'https://test-image-url.com/image.jpg';

    beforeEach(async () => {

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
                        getUniqueRandomImage: jest.fn().mockReturnValue(mockImageUrl)
                    }
                },
                provideRouter([])
            ]
        }).compileComponents();

        imageService = TestBed.inject(ImageService);
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should display user information', () => {

        component.user = mockUser;
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain(mockUser.name);
        expect(compiled.textContent).toContain(mockUser.username);
        expect(compiled.textContent).toContain(mockUser.email);

    });

    it('should emit favoriteToggled event when favorite button is clicked', () => {

        component.user = mockUser;
        fixture.detectChanges();

        const emitSpy = jest.spyOn(component.favoriteToggled, 'emit');
        component.onFavoriteClick();
        expect(emitSpy).toHaveBeenCalledWith(mockUser.id);

    });

    it('should cache image URL after first access', () => {

        // Clear any previous calls
        jest.clearAllMocks();

        // Set user
        component.user = mockUser;
        fixture.detectChanges();

        // First access should call service
        const firstUrl = component.randomImageUrl;
        expect(imageService.getUniqueRandomImage).toHaveBeenCalledTimes(1);
        expect(firstUrl).toBe(mockImageUrl);

        // Second access should use cache
        const secondUrl = component.randomImageUrl;
        expect(imageService.getUniqueRandomImage).toHaveBeenCalledTimes(1);
        expect(secondUrl).toBe(mockImageUrl);

    });

    it('should return empty string for randomImageUrl when no user id', () => {

        const invalidUser = { ...mockUser, id: 0 };
        component.user = invalidUser;
        fixture.detectChanges();

        const imageUrl = component.randomImageUrl;
        expect(imageService.getUniqueRandomImage).not.toHaveBeenCalled();
        expect(imageUrl).toBe('');

    });

    it('should reset cache when user changes', () => {

        // Set initial user
        component.user = mockUser;
        fixture.detectChanges();

        // First access - store result to prevent linting error
        const firstUrl = component.randomImageUrl;
        expect(firstUrl).toBe(mockImageUrl);

        // Set new user
        component.user = { ...mockUser, id: 2 };
        fixture.detectChanges();

        // Should call service again for new user
        const newUrl = component.randomImageUrl;
        expect(imageService.getUniqueRandomImage).toHaveBeenCalledTimes(2);
        expect(newUrl).toBe(mockImageUrl);

    });

});
