import { Component, OnInit, ViewEncapsulation , ViewChild} from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  selectedRecipe: Recipe;
  isLoading = false;
  isFavourite = false;
  constructor(private router: Router, private dataService: DataService) { }

  ionViewWillEnter() {

    this.selectedRecipe = this.dataService.detailRecipe;
    var favRecipes = this.dataService.getFavFromStorage();
    console.log(favRecipes);
    var count = 0;
    this.isFavourite = false;
    while (!this.isFavourite && count<favRecipes.length){
      if (favRecipes[count].recipeLink == this.selectedRecipe.recipeLink) {
        this.isFavourite = true;
      }
      count++;
    }
  }

  ngOnInit() {
    //console.log(this.dataService.detailRecipe.recipeHTML)
    //TODO: lazy loading image
    //ionViewWillEnter();
  }



  goBack(){
    console.log("click");
    this.router.navigate(this.dataService.previousPath);
  }
  onHeartClick(){

    if (this.isFavourite){
      this.dataService.removeFromLocalStorage(this.selectedRecipe);
    }
    else{
      this.dataService.storeOnLocalStorage(this.selectedRecipe);
    }
    this.isFavourite = !(this.isFavourite);
  }
}
