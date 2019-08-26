import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Recipe } from './recipe';

// key that is used to access the data in local storage
const STORAGE_KEY = 'local_todolist';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  serverAddress = 'https://tom1092.pythonanywhere.com/scooked_app/?';
  currentIngredients: string[] = [];
  ingredientList: string[] = [];
  currentRecipe: Recipe[] = [];
  recipeUrl = this.serverAddress + 'list=0&ing=';
  requestRecipeUrl = ''; // url sent to server
  previousPath: string [] = [];
  public detailRecipe: Recipe;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) {
    var anotherTodolist = [];
    this.fetchIngredients().subscribe(tmp_ings => {
      for (var i = 0; i < tmp_ings.length; i++){
        tmp_ings[i] = tmp_ings[i].replace(/_/g, ' ');
        tmp_ings[i] = tmp_ings[i].charAt(0).toUpperCase() + tmp_ings[i].slice(1);
      }
      this.ingredientList = tmp_ings;
    });
  }

  public storeOnLocalStorage(recipe): void {

          // get array of tasks from local storage
          const currentTodoList = this.storage.get(STORAGE_KEY) || [];
          // push new task to array
          //const currentTodoList = []
          currentTodoList.push(recipe);
          // insert updated array to local storage
          this.storage.set(STORAGE_KEY, currentTodoList);
          console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public removeFromLocalStorage(recipe){

    var recLink = recipe.recipeLink;
    const currentList = this.storage.get(STORAGE_KEY) || [];
    var count = 0;
    var found = false;
    var index = 0;
    while (!found && count<currentList.length){
      if (currentList[count].recipeLink == recLink){
        index = count;
        found = true;
      }
      count++;
    }
    currentList.splice(index, 1);
    this.storage.set(STORAGE_KEY, currentList);
  }

  public getFavFromStorage(){
    // get array of tasks from local storage
    const currentList = this.storage.get(STORAGE_KEY) || [];
    return currentList;
  }

  fetchIngredients() {
    return this.http
      .get<any>(this.serverAddress + 'list=1')
      .pipe(
        map(resData => {
          return resData.map( item => item.Name);
        })
      );
  }

  fetchRecipes() {
    return this.http
    .get<any>(this.requestRecipeUrl)
    .pipe(
      map(resData => {
        const recipes = [];
        for (const recipe of resData){
          var ingredients = recipe.Ingredients.split(',');
          recipes.push(new Recipe(recipe.RecipeTitle, recipe.ImgLink, recipe.RecipeLink, ingredients, "", ""));
        }
        return recipes;
      })
    );
  }

  fetchRandomRecipes(ing1) {
    ing1 = ing1.replace(/ /g, '_');
    const randomRecipeUrl = this.serverAddress + 'list=0&ing=' + ing1 + '&range=0%235';
    return this.http.get<any>(randomRecipeUrl)
      .pipe(
        map(resData => {
          const recipes = [];
          for (const recipe of resData){
            var ingredients = recipe.Ingredients.split(',');
            recipes.push(new Recipe(recipe.RecipeTitle, recipe.ImgLink, recipe.RecipeLink, ingredients, "", ""));
          }
          return recipes;
        })
      );
  }

  fetchSuggestedRecipes() {
    const randomRecipeUrl = this.serverAddress + 'suggested=1';
    return this.http.get<any>(randomRecipeUrl)
      .pipe(
        map(resData => {
          const recipes = [];
          for (const recipe of resData){
            var ingredients = recipe.Ingredients.split(',');
            recipes.push(new Recipe(recipe.RecipeTitle, recipe.ImgLink, recipe.RecipeLink, ingredients,"", ""));
          }
          return recipes;
        })
      );
  }

  getRecipeDescription(recipe){

    const requestUrl = this.serverAddress + 'recipe='+recipe.title.toLowerCase();
    return this.http.get<any>(requestUrl)
      .pipe(
        map(resData => {
          const description = resData.Description;
          const html = resData.Html;
          const selectedRec = new Recipe(recipe.title, recipe.imageUrl, recipe.recipeLink, recipe.Ingredients, description, html);
          return selectedRec;
        })
      );
  }
  getAllcurrentIngredients() {
    return this.currentIngredients;
  }

  searchIng(ingredient){
    for (var ing in this.currentIngredients){
      if (this.currentIngredients[ing]==ingredient){
        return true;
      }
    }
    return false;
  }

  addIngredient(searchedIng) {
    if(!this.searchIng(searchedIng)){
      this.currentIngredients.push(searchedIng);
      this.recipeUrl = this.recipeUrl + this.normalizeIngredient(searchedIng) + '%23';
      this.requestRecipeUrl = this.recipeUrl.slice(0, -3) + '&range=0%2320';
    }
  }

  normalizeIngredient(searchedIng){
    searchedIng = searchedIng.replace(/ /g, '_');
    searchedIng = searchedIng.charAt(0).toUpperCase() + searchedIng.slice(1);
    return searchedIng;
  }


  getAllRecipes() {
    return this.currentRecipe;
  }

  removeIngredient(selectedIng) {
    this.currentIngredients = this.currentIngredients.filter(value => {
      return value !== selectedIng;
    });

    this.recipeUrl = this.serverAddress + 'list=0&ing=';
    for (var i = 0; i < this.currentIngredients.length; i++) {
      this.recipeUrl = this.recipeUrl + this.normalizeIngredient(this.currentIngredients[i]) + '%23';
    }
    this.requestRecipeUrl = this.recipeUrl.slice(0, -3) + '&range=0%2320';
    // console.log(this.recipeUrl);
    // console.log(this.requestRecipeUrl);

    return this.currentIngredients;
  }

  storeFavRecipes(recipeSel: Recipe) {
    return this.http.post('https://scooked-b3f5f.firebaseio.com/data.json', recipeSel)
  }

  getFavRecipes() {
    return this.http.get<any>('https://scooked-b3f5f.firebaseio.com/data.json');
  }

  storeRecipeNote(recIngredients: string[]) {
    const ING_KEY = 'blocknote_list';
    let currentIngList = [];
    if (this.storage.get(ING_KEY) !== undefined) {
      currentIngList = this.storage.get(ING_KEY);
    }

    for (const item of recIngredients) {
      currentIngList.push({
        isCheck: false,
        text: item
      });
    }

    this.storage.set(ING_KEY, currentIngList);

  }
}
