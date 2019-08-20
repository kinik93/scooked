import { Injectable } from '@angular/core';
import { ShoppingListItem } from './ShoppingListItem';

@Injectable({
  providedIn: 'root'
})
export class BnService {

  public myShoppingList: ShoppingListItem[];

  constructor() {
    this.myShoppingList = [];
  }
}
