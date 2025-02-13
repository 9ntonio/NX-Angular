import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { UsersState } from './user.models';

export const initialState: UsersState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    filters: {
        searchTerm: '',
        showFavoritesOnly: false,
    },
};

export const usersReducer = createReducer(
    initialState,
    on(UsersActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
    })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),
    on(UsersActions.selectUser, (state, { userId }) => ({
        ...state,
        selectedUser: state.users.find((user) => user.id === userId) || null,
    })),
    on(UsersActions.toggleFavorite, (state, { userId }) => ({
        ...state,
        users: state.users.map((user) => (user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user)),
    })),
    on(UsersActions.setFilter, (state, { searchTerm }) => ({
        ...state,
        filters: {
            ...state.filters,
            searchTerm,
        },
    })),
    on(UsersActions.toggleFavoritesFilter, (state) => ({
        ...state,
        filters: {
            ...state.filters,
            showFavoritesOnly: !state.filters.showFavoritesOnly,
        },
    })),
);
