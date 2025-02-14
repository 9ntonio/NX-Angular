import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersService } from './users.service';

@Injectable()
export class UsersEffects {

    private readonly actions$ = inject(Actions);
    private readonly usersService = inject(UsersService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            switchMap(() =>
                this.usersService.getUsers().pipe(
                    map((users) => UsersActions.loadUsersSuccess({ users })),
                    catchError((error) =>
                        of(UsersActions.loadUsersFailure({ error: error.message })))
                ))
        ));

}
