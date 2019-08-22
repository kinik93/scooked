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

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    //console.log(this.dataService.detailRecipe.recipeHTML)
    this.selectedRecipe = this.dataService.detailRecipe;
  }

  goBack(){
    console.log("click");
    this.router.navigate(this.dataService.previousPath);
  }
}
