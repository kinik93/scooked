import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {Recipe} from '../recipe';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  favRecipes: Recipe[];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.favRecipes = this.dataService.getFavFromStorage();
  }
  ionViewWillEnter(){
    this.favRecipes = this.dataService.getFavFromStorage();

    console.log(this.favRecipes.length);
  }
  onRecipeClick(selRec: Recipe){

      this.dataService.detailRecipe = selRec;
      console.log(selRec.title);
      this.dataService.previousPath = ['tabs/favourite'];
      this.router.navigate(['tabs/esplora/recipe-detail']);

  }
}
