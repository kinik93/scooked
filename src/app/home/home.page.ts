import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {Recipe} from '../recipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  rndIng1: string;
  randomRecipes: Recipe[] = [];
  suggestedRecipes: Recipe[] = [];
  isLoading = false;

  favoutireRecipes: Recipe[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  fetchRecipes() {
    this.isLoading = true;

    //TODO?: L'errore è qui perchè ingredientList è vuoto (se si fa reload da questa pagina)
    this.rndIng1 = this.dataService.ingredientList[Math.floor(Math.random() * this.dataService.ingredientList.length)];
    //this.rndIng1 = 'spaghetti';

    this.dataService.fetchRandomRecipes(this.rndIng1).subscribe(rand_recipes => {
      this.randomRecipes = rand_recipes;
    });
    this.dataService.fetchSuggestedRecipes().subscribe(suggested_recipes => {
      this.suggestedRecipes = suggested_recipes;
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.fetchRecipes();
  }

  ionViewWillEnter() {
    this.dataService.getFavRecipes().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onRecipeClick(selectedRecipe: Recipe){
    this.dataService.getRecipeDescription(selectedRecipe).subscribe(detailRecipe => {
      this.dataService.detailRecipe = detailRecipe;
      this.dataService.previousPath = ['tabs/home/'];
      this.router.navigate(['tabs/esplora/recipe-detail']);
    });
  }

  onPull(event) {
    event.target.getProgress().then(result => {
      console.log('Pull index: ', result);
    });
  }

  doRefresh(event) {
    this.fetchRecipes();

    setTimeout(() => {
      console.log('Async reloading has ended');
      event.target.complete();
    }, 500);
  }

}
