import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esplora',
  templateUrl: './esplora.page.html',
  styleUrls: ['./esplora.page.scss'],
})
export class EsploraPage implements OnInit {
  enteredInputValue: string;
  ingredientList: string[];
  ingredientSearchList: string[];
  isLoading = false;

  constructor(private router: Router, private dataService: DataService) {
    this.enteredInputValue = '';
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.dataService.fetchIngredients().subscribe(ingredients => {
      for (var i = 0; i < ingredients.length; i++){
        ingredients[i] = ingredients[i].replace(/_/g, ' ');
        ingredients[i] = ingredients[i].charAt(0).toUpperCase() + ingredients[i].slice(1);
      }
      this.ingredientList = ingredients;
      this.isLoading = false;
    });
  }

  onTextChange() {
    this.ingredientSearchList = this.ingredientList.filter(item => {
      return item.toLowerCase().indexOf(this.enteredInputValue.toLowerCase()) > -1;
    });
  }

  onIngredientClick(selectedIng) {
    this.dataService.addIngredient(selectedIng);
    this.router.navigate(['/home']);
  }
}
