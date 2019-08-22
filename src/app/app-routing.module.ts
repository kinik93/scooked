import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  {path: 'tabs/esplora/recipe-detail', loadChildren: './esplora/recipe-detail/recipe-detail.module#RecipeDetailPageModule' }
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },

  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  //{ path: 'bessia', loadChildren: './bessia/bessia.module#BessiaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
