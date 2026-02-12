import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "user",
        pathMatch: "full"
    },
    {
        path: "user",
        loadComponent: () => import('./user/list/list').then(m => m.List)
    }
];
