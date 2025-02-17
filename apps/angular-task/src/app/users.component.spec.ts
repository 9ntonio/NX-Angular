import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter, ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersComponent } from './users.component';
import { UsersActions } from './+state/users/users.actions';
import { selectUserById, selectSelectedUser, selectLoading, selectError } from './+state/users/users.selectors';
import { of } from 'rxjs';
import { User } from './+state/users/user.models';

describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let store: MockStore;
    let storeSpy: jest.SpyInstance;

    const mockUser: User = {
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

    const initialState = {
        users: {
            users: [],
            selectedUser: null,
            loading: false,
            error: null,
            filters: {
                searchTerm: '',
                showFavoritesOnly: false
            }
        }
    };

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                UsersComponent,
                RouterModule,
                NoopAnimationsModule,
                MatCardModule,
                MatButtonModule,
                MatIconModule,
                MatDividerModule,
                MatProgressSpinnerModule
            ],
            providers: [
                provideMockStore({ initialState }),
                provideRouter([]),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: '1' })
                    }
                }
            ]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        storeSpy = jest.spyOn(store, 'dispatch');

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;

    });

    afterEach(() => {

        store.resetSelectors();
        storeSpy.mockClear();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should select user when it exists in store', (done) => {

        // Setup the state to include the user
        store.setState({
            ...initialState,
            users: {
                ...initialState.users,
                users: [mockUser]
            }
        });

        // Override selector to find the user
        store.overrideSelector(selectUserById(1), mockUser);

        // Initialize component which triggers ngOnInit
        fixture.detectChanges();

        // Wait for async operations
        setTimeout(() => {

            expect(storeSpy).toHaveBeenCalledWith(UsersActions.selectUser({ userId: 1 }));
            done();

        });

    });

    it('should load user when not in store', (done) => {

        // Override selector to indicate user not found
        store.overrideSelector(selectUserById(1), undefined);

        // Initialize component
        fixture.detectChanges();

        // Wait for async operations
        setTimeout(() => {

            expect(storeSpy).toHaveBeenCalledWith(UsersActions.loadUserById({ userId: 1 }));
            done();

        });

    });

    it('should toggle favorite', () => {

        component.toggleFavorite(1);
        expect(storeSpy).toHaveBeenCalledWith(UsersActions.toggleFavorite({ userId: 1 }));

    });

    it('should display user information when loaded', () => {

        store.overrideSelector(selectSelectedUser, mockUser);
        store.refreshState();
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain(mockUser.name);
        expect(compiled.textContent).toContain(mockUser.email);
        expect(compiled.textContent).toContain(mockUser.company.name);

    });

    it('should show loading spinner when loading', () => {

        store.overrideSelector(selectLoading, true);
        store.refreshState();
        fixture.detectChanges();

        const spinner = fixture.nativeElement.querySelector('mat-spinner');
        expect(spinner).toBeTruthy();

    });

    it('should show error message when there is an error', () => {

        const errorMessage = 'Test error message';
        store.overrideSelector(selectError, errorMessage);
        store.overrideSelector(selectSelectedUser, null);
        store.refreshState();
        fixture.detectChanges();

        const errorElement = fixture.nativeElement.querySelector('.error-message');
        expect(errorElement.textContent).toContain(errorMessage);

    });

    it('should dispatch loadUsers when navigateBack is called', () => {

        component.navigateBack();
        expect(storeSpy).toHaveBeenCalledWith(UsersActions.loadUsers());

    });

});
