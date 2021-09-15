import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'return',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'forbidden',
    loadChildren: () => import('./forbidden/forbidden.module').then( m => m.ForbiddenPageModule)
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./unauthorized/unauthorized.module').then( m => m.UnauthorizedPageModule)
  },
  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
