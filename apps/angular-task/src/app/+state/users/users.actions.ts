import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.models';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),
        'Select User': props<{ userId: number }>(),
        'Toggle Favorite': props<{ userId: number }>(),
        'Set Filter': props<{ searchTerm: string }>(),
        'Toggle Favorites Filter': emptyProps(),
    },
});
