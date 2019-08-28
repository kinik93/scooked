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
  toggleRecipes = true;
  from = 0;
  to = 20;
  recipeList : Recipe [] = [];
  //ci metto il mio

  constructor(private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.currentIngredients = this.dataService.getAllcurrentIngredients();
  }

  ionViewWillEnter(){
    if(this.currentIngredients.length > 0)
    {
        this.from = 0;
        this.to = 20;
        this.isLoadingRecipe  = true;
        this.dataService.fetchRecipes(this.from, this.to).subscribe(filteredRecipes => {
        this.recipeList = filteredRecipes;
        this.normalizeRecipes();
        this.isLoadingRecipe  = false;
      });
    }
  }
  updateFromTo(event){
    console.log("updated");
    if(this.currentIngredients.length > 0)
    {
      this.from = this.from + 20;
      this.to = this.to + 20;
      this.dataService.fetchRecipes(this.from, this.to).subscribe(filteredRecipes => {
      this.recipeList = filteredRecipes;
      this.normalizeRecipes();
      this.isLoadingRecipe  = false;
      event.target.complete();
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

      //Vedere di risolvere problema caricamento
      let s = detailRecipe.recipeHTML.replace(/<img /g, '<img id="lazy" ');
      //console.log(s);
      detailRecipe.recipeHTML = s;
      //console.log(detailRecipe.recipeHTML);
      this.dataService.detailRecipe = detailRecipe;
      this.dataService.detailRecipe.recipeIngredients = selectedRecipe.recipeIngredients;

      this.dataService.previousPath = ['tabs/esplora/'];
      this.router.navigate(['tabs/esplora/recipe-detail']);
    });

  }

  removeCurrentIngredient(ing: string) {
    this.currentIngredients = this.dataService.removeIngredient(ing);
    this.from = 0;
    this.to = 20;
    if(this.currentIngredients.length > 0){
      this.dataService.fetchRecipes(this.from, this.to).subscribe(filteredRecipes => {
        this.recipeList = filteredRecipes;
        this.normalizeRecipes();
      });
    }
  }

  normalizeRecipes(){
    for (var i=0; i < this.recipeList.length; i++){
      this.recipeList[i].title = this.recipeList[i].title.charAt(0).toUpperCase() + this.recipeList[i].title.slice(1);
    }
  }

}
