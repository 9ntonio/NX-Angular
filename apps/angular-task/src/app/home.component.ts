import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UsersActions } from './+state/users/users.actions';
import { Observable } from 'rxjs';
import { CardComponent } from '@crx/public-library';
import { AppState } from './app.state';
import { selectFilteredUsers } from './+state/users/users.selectors';
import { User } from './+state/users/user.models';

@Component({
    selector: 'crx-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        CardComponent
    ],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    searchTerm = '';
    filteredUsers$: Observable<User[]>;

    constructor (private readonly store: Store<AppState>) {

        this.filteredUsers$ = this.store.select(selectFilteredUsers);

    }

    ngOnInit () {

        this.store.dispatch(UsersActions.loadUsers());

    }

    onFavoriteToggled (userId: number) {

        this.store.dispatch(UsersActions.toggleFavorite({ userId }));

    }

    onSearch (term: string) {

        this.searchTerm = term;
        this.store.dispatch(UsersActions.setFilter({ searchTerm: term }));

    }

}
