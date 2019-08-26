import { Injectable, Inject } from '@angular/core';
import { ShoppingListItem } from './ShoppingListItem';
import {LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'blocknote_list';

@Injectable({
  providedIn: 'root'
})
export class BnService {

  public myShoppingList: ShoppingListItem[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

  }

  public loadLocalStorage() {
    this.myShoppingList = [];
    try {
      if (this.storage.get(STORAGE_KEY).length > 0) {
        for (const item of this.storage.get(STORAGE_KEY)) {
          this.myShoppingList.push(new ShoppingListItem(item.isCheck, item.text));
        }
      }
    } catch (e) {
      this.storage.set(STORAGE_KEY, this.myShoppingList);
    }
  }

  public storeOnLocalStorage() {
    this.storage.set(STORAGE_KEY, this.myShoppingList);
  }
}
