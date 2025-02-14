import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home.component').then((c) => c.HomeComponent)
    },
    {
        path: 'users/:id',
        loadComponent: () => import('./users.component').then((c) => c.UsersComponent)
    }
];
