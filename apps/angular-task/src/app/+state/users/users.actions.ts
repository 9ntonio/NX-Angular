import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.models';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        // !! Load all users
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),

        // !! Load single user
        'Load User By Id': props<{ userId: number }>(),
        'Load User Success': props<{ user: User }>(),
        'Load User Failure': props<{ error: string }>(),

        // !! User interaction actions
        'Select User': props<{ userId: number }>(),
        'Toggle Favorite': props<{ userId: number }>(),

        // !! Filter actions
        'Set Filter': props<{ searchTerm: string }>(),
        'Toggle Favorites Filter': emptyProps(),
    },
});
