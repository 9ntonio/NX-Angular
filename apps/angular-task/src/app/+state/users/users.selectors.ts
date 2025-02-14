import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './user.models';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);

export const selectLoading = createSelector(selectUsersState, (state) => state.loading);

export const selectError = createSelector(selectUsersState, (state) => state.error);

export const selectSelectedUser = createSelector(selectUsersState, (state) => state.selectedUser);

export const selectFilters = createSelector(selectUsersState, (state) => state.filters);

export const selectFilteredUsers = createSelector(selectAllUsers, selectFilters, (users, filters) => {

    let filteredUsers = [...users];

    if (filters.searchTerm) {

        const searchTerm = filters.searchTerm.toLowerCase();
        filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm)
                || user.email.toLowerCase().includes(searchTerm)
                || user.username.toLowerCase().includes(searchTerm),);

    }

    if (filters.showFavoritesOnly) {

        filteredUsers = filteredUsers.filter((user) => user.isFavorite);

    }

    return filteredUsers;

});
