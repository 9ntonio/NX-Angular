import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usersReducer } from './+state/users/users.reducer';
import { UsersEffects } from './+state/users/users.effects';

const serverConfig: ApplicationConfig = {
    providers: [
        provideServerRendering(),
        // !! Users State
        provideStore({
            users: usersReducer
        }),
        // !! Users Effects
        provideEffects([UsersEffects])
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
