import { Routes } from '@angular/router';
import { getPost } from './shared/resolvers/get-post.resolver';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./views/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./views/form/form.component').then((c) => c.FormComponent),
  },
  {
    path: 'form/:id',
    loadComponent: () =>
      import('./views/form/form.component').then((c) => c.FormComponent),
    resolve: {
      post: getPost,
    },
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
