/* eslint-disable @angular-eslint/component-selector */
// apps/angular-task/src/app/home.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterModule, provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UsersActions } from './+state/users/users.actions';
import { selectFilteredUsers } from './+state/users/users.selectors';
import { User } from './+state/users/user.models';
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Mock Card Component
@Component({
    selector: 'lib-card',
    template: '<div>Mock Card</div>'
})
class MockCardComponent {

    @Input() user: any;
    @Output() favoriteToggled = new EventEmitter<number>();

}

describe('HomeComponent', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let store: MockStore;
    let storeSpy: jest.SpyInstance;

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

    const mockUsers: User[] = [
        {
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
        }
    ];

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [MockCardComponent],
            imports: [
                HomeComponent,
                RouterModule,
                NoopAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
                FormsModule
            ],
            providers: [
                provideMockStore({ initialState }),
                provideRouter([])
            ]
        }).compileComponents();

        store = TestBed.inject(Store) as MockStore;
        store.overrideSelector(selectFilteredUsers, mockUsers);
        storeSpy = jest.spyOn(store, 'dispatch');

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    afterEach(() => {

        store.resetSelectors();
        storeSpy.mockClear();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should dispatch loadUsers on init', () => {

        component.ngOnInit();
        expect(storeSpy).toHaveBeenCalledWith(UsersActions.loadUsers());

    });

    it('should dispatch toggleFavorite when onFavoriteToggled is called', () => {

        const userId = 1;
        component.onFavoriteToggled(userId);
        expect(storeSpy).toHaveBeenCalledWith(UsersActions.toggleFavorite({ userId }));

    });

    it('should update search term and dispatch setFilter', () => {

        const searchTerm = 'test';
        component.onSearch(searchTerm);

        expect(component.searchTerm).toBe(searchTerm);
        expect(storeSpy).toHaveBeenCalledWith(UsersActions.setFilter({ searchTerm }));

    });

    it('should display filtered users from store', (done) => {

        component.filteredUsers$.subscribe((users) => {

            expect(users).toEqual(mockUsers);
            done();

        });

    });

    it('should show no users message when filtered users is empty', async () => {

        store.overrideSelector(selectFilteredUsers, []);
        store.refreshState();
        fixture.detectChanges();
        await fixture.whenStable();

        // Force the async pipe to complete
        await new Promise((resolve) => setTimeout(resolve, 0));
        fixture.detectChanges();

        const emptyStateDiv = fixture.nativeElement.querySelector('.col-span-full');
        expect(emptyStateDiv).toBeTruthy();
        expect(emptyStateDiv.textContent.trim()).toBe('No users found matching your criteria');

    });

});
