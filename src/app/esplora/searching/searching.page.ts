import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.page.html',
  styleUrls: ['./searching.page.scss'],
})
export class SearchingPage implements OnInit {

  @ViewChild('input', {static: false}) searchInput: {setFocus: () => void; };
  ingredients: string[];
  filteredIngredients: string[] = [];
  isLoadIng = false;
  isFiltering = false;
  currentInputValue = '';

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.searchInput.setFocus();
  }

  onInputChange() {
    this.isFiltering = true;
    this.filteredIngredients = this.dataService.ingredientList.filter(item => {
      return item.toLowerCase().indexOf(this.currentInputValue.toLowerCase()) > -1;
    });
    this.isFiltering = false;
  }

  onIngClick(selectedIng: string){
    this.dataService.addIngredient(selectedIng);
    this.router.navigate(['/tabs/esplora']);
  }

}
