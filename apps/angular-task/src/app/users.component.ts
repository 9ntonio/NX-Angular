import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subject, takeUntil, filter, map, take } from 'rxjs';
import { User } from './+state/users/user.models';
import { UsersActions } from './+state/users/users.actions';
import { AppState } from './app.state';
import { selectUserById, selectSelectedUser, selectLoading, selectError } from './+state/users/users.selectors';

@Component({
    selector: 'crx-users',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './users.component.html',
    styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {

    // !! Observables for component state
    selectedUser$: Observable<User | null>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;

    // !! Subject for handling component cleanup
    private readonly destroy$ = new Subject<void>();

    constructor (
        private readonly store: Store<AppState>,
        private readonly route: ActivatedRoute,
    ) {

        // !! Initialize observables from store
        this.selectedUser$ = this.store.select(selectSelectedUser);
        this.loading$ = this.store.select(selectLoading);
        this.error$ = this.store.select(selectError);

    }

    ngOnInit (): void {

        // !! Subscribe to route params and handle user loading
        this.route.params
        .pipe(
            takeUntil(this.destroy$),
            map((params) => parseInt(params['id'], 10)),
            filter((userId) => !isNaN(userId)),
        )
        .subscribe((userId) => {

            // !! Check if user exists in store
            this.store
            .select(selectUserById(userId))
            .pipe(take(1))
            .subscribe((existingUser) => {

                if (existingUser) {

                    // !! If user exists, just select it
                    this.store.dispatch(UsersActions.selectUser({ userId }));

                } else {

                    // !! If user doesn't exist, load it from API
                    this.store.dispatch(UsersActions.loadUserById({ userId }));

                }

            });

        });

    }

    ngOnDestroy (): void {

        // !! Cleanup subscriptions
        this.destroy$.next();
        this.destroy$.complete();

    }

    toggleFavorite (userId: number): void {

        // !! Toggle favorite status
        this.store.dispatch(UsersActions.toggleFavorite({ userId }));

    }

    navigateBack (): void {

        // !! Helper method to navigate back to home
        this.store.dispatch(UsersActions.loadUsers());

    }

}
