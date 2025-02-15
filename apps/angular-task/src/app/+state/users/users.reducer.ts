import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { UsersState } from './user.models';

// !! Define initial state
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
    // !! Load all users reducers
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

    // !! Load single user reducers
    on(UsersActions.loadUserById, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(UsersActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        selectedUser: user,
        loading: false,
        // !! Update user in the users array if it exists
        users: state.users.map((existingUser) =>
            existingUser.id === user.id ? { ...user, isFavorite: existingUser.isFavorite } : existingUser),
    })),
    on(UsersActions.loadUserFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),

    // !! User interaction reducers
    on(UsersActions.selectUser, (state, { userId }) => ({
        ...state,
        selectedUser: state.users.find((user) => user.id === userId) || null,
    })),
    on(UsersActions.toggleFavorite, (state, { userId }) => ({
        ...state,
        users: state.users.map((user) =>
            user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user),
        selectedUser:
            state.selectedUser?.id === userId
                ? { ...state.selectedUser, isFavorite: !state.selectedUser.isFavorite }
                : state.selectedUser,
    })),

    // Filter reducers
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
    }))
);
