import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UsersActions } from './+state/users/users.actions';
import { Observable } from 'rxjs';
import { User } from './+state/users/user.models';
import { AppState } from './app.state';

@Component({
    selector: 'crx-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    searchTerm = '';
    showFavoritesOnly = false;
    filteredUsers$: Observable<User[]>;

    constructor (private readonly store: Store<AppState>) {

        this.filteredUsers$ = this.store.select((state) => {

            const users = state.users.users;
            return users.filter((user) => {

                const matchesSearch
                    = user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                    || user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
                const matchesFavorites = this.showFavoritesOnly ? user.isFavorite : true;
                return matchesSearch && matchesFavorites;

            });

        });

    }

    ngOnInit () {

        this.store.dispatch(UsersActions.loadUsers());

    }

    toggleFavorite (userId: number) {

        this.store.dispatch(UsersActions.toggleFavorite({ userId }));

    }

    onSearch (term: string) {

        this.searchTerm = term;
        this.store.dispatch(UsersActions.setFilter({ searchTerm: term }));

    }

    toggleFavorites () {

        this.showFavoritesOnly = !this.showFavoritesOnly;
        this.store.dispatch(UsersActions.toggleFavoritesFilter());

    }

}
