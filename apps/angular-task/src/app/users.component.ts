import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { User } from './+state/users/user.models';
import { UsersActions } from './+state/users/users.actions';
import { AppState } from './app.state';

@Component({
    selector: 'crx-users',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
    templateUrl: './users.component.html',
    styles: [
        `
            :host {
                display: block;
            }

            .mat-divider {
                margin: 1rem 0;
            }
        `,
    ],
})
export class UsersComponent implements OnInit {

    selectedUser$: Observable<User | null>;

    constructor (
        private readonly store: Store<AppState>,
        private readonly route: ActivatedRoute,
    ) {

        this.selectedUser$ = this.store.select((state) => state.users.selectedUser);

    }

    ngOnInit (): void {

        // Load all users if not already loaded
        this.store.dispatch(UsersActions.loadUsers());

        // Get the user ID from the route and select the user
        this.route.params.subscribe((params) => {

            const userId = parseInt(params['id'], 10);
            if (!isNaN(userId)) {

                this.store.dispatch(UsersActions.selectUser({ userId }));

            }

        });

    }

    toggleFavorite (userId: number): void {

        this.store.dispatch(UsersActions.toggleFavorite({ userId }));

    }

}
