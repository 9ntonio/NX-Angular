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
    styles: [
        `
            :host {
                display: block;
            }

            .mat-divider {
                margin: 1rem 0;
            }

            .error-container {
                text-align: center;
                padding: 2rem;
                background-color: #fef2f2;
                border-radius: 0.5rem;
                margin: 2rem;
            }

            .error-message {
                color: #dc2626;
                font-weight: 500;
            }

            .loading-container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem;
            }
        `,
    ],
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

            // !! Check if user already exists in store
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

}
