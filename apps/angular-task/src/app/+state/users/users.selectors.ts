import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './user.models';

// !! Base selector for users state
export const selectUsersState = createFeatureSelector<UsersState>('users');

// !! Basic selectors
export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);
export const selectLoading = createSelector(selectUsersState, (state) => state.loading);
export const selectError = createSelector(selectUsersState, (state) => state.error);
export const selectSelectedUser = createSelector(selectUsersState, (state) => state.selectedUser);
export const selectFilters = createSelector(selectUsersState, (state) => state.filters);

// !! Select user by ID - used for checking if user exists in store
export const selectUserById = (userId: number) =>
    createSelector(selectAllUsers, (users) =>
        users.find((user) => user.id === userId));

// !! Filtered users selector
export const selectFilteredUsers = createSelector(
    selectAllUsers,
    selectFilters,
    (users, filters) => {

        let filteredUsers = [...users];

        // !! Apply search term filter
        if (filters.searchTerm) {

            const searchTerm = filters.searchTerm.toLowerCase();
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(searchTerm)
                || user.email.toLowerCase().includes(searchTerm)
                || user.username.toLowerCase().includes(searchTerm),);

        }

        // !! Apply favorites filter
        if (filters.showFavoritesOnly) {

            filteredUsers = filteredUsers.filter((user) => user.isFavorite);

        }

        return filteredUsers;

    }
);
