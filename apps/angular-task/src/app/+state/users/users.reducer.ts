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

    // !! Load all users reducers
    on(UsersActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users.map((user) => ({
            ...user,
            isFavorite: state.users.find((u) => u.id === user.id)?.isFavorite || false
        })),
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

    on(UsersActions.loadUserSuccess, (state, { user }) => {

        const existingUser = state.users.find((u) => u.id === user.id);
        const updatedUser = {
            ...user,
            isFavorite: existingUser?.isFavorite || false
        };

        return {
            ...state,
            selectedUser: updatedUser,
            loading: false,
            users: state.users.some((u) => u.id === user.id)
                ? state.users.map((u) => u.id === user.id ? updatedUser : u)
                : [...state.users, updatedUser]
        };

    }),

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

    on(UsersActions.toggleFavorite, (state, { userId }) => {

        const updatedUsers = state.users.map((user) =>
            user.id === userId
                ? { ...user, isFavorite: !user.isFavorite }
                : user);

        return {
            ...state,
            users: updatedUsers,
            selectedUser: state.selectedUser?.id === userId
                ? { ...state.selectedUser, isFavorite: !state.selectedUser.isFavorite }
                : state.selectedUser
        };

    }),

    // !! Filter reducers
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
