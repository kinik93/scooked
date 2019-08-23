import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'esplora',
        children: [
          {
            path: '',
            loadChildren: '../esplora/esplora.module#EsploraPageModule'
          },
          {
            path: 'searching',
            loadChildren: '../esplora/searching/searching.module#SearchingPageModule'
          },
          {
            path: 'blocknote',
            loadChildren: '../esplora/blocknote/blocknote.module#BlocknotePageModule'
          }
        ]
      },
      {
        path: 'favourite',
        children: [
          {
            path: '',
            loadChildren: '../favourite/favourite.module#FavouritePageModule'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/esplora',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
