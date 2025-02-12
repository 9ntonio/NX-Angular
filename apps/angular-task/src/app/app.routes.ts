import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./users.component').then((m) => m.UsersComponent)
    }
];
