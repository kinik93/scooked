import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {Recipe} from '../recipe';

//ESPLORA
@Component({
  selector: 'app-esplora',
  templateUrl: './esplora.page.html',
  styleUrls: ['./esplora.page.scss'],
})

export class EsploraPage implements OnInit {
  isLoading = false;
  isLoadingRecipe = false;
  currentIngredients: string[];
  currentRecipes: Recipe[];

  constructor(private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.currentIngredients = this.dataService.getAllcurrentIngredients();
  }

  ionViewWillEnter(){
    if(this.currentIngredients.length > 0)
    {
        this.isLoadingRecipe  = true;
        this.dataService.fetchRecipes().subscribe(filteredRecipes => {
        this.currentRecipes = filteredRecipes;
        this.normalizeRecipes();
        this.isLoadingRecipe  = false;
      });
    }
  }

  goToNote(){
    this.router.navigate(['tabs/esplora/blocknote']);
  }

  onSearchFocus() {
    this.router.navigate(['tabs/esplora/searching']);
  }

  onRecipeClick(selectedRecipe: Recipe){
    this.dataService.getRecipeDescription(selectedRecipe).subscribe(detailRecipe => {
      this.dataService.detailRecipe = detailRecipe;
      this.dataService.previousPath = ['tabs/esplora/'];
      this.router.navigate(['tabs/esplora/recipe-detail']);
    });
  }

  removeCurrentIngredient(ing: string) {
    this.currentIngredients = this.dataService.removeIngredient(ing);
    if(this.currentIngredients.length > 0){
      this.dataService.fetchRecipes().subscribe(filteredRecipes => {
        this.currentRecipes = filteredRecipes;
        this.normalizeRecipes();
      });
    }
  }

  normalizeRecipes(){
    for (var i=0; i < this.currentRecipes.length; i++){
      this.currentRecipes[i].title = this.currentRecipes[i].title.charAt(0).toUpperCase() + this.currentRecipes[i].title.slice(1);
    }
  }

  onHeartClick(rec) {
    this.dataService.storeFavRecipes(rec).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
