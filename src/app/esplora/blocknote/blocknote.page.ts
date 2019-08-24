import { Component, OnInit } from '@angular/core';
import { ShoppingListItem } from './ShoppingListItem';
import { BnService } from './bn.service';

@Component({
  selector: 'app-blocknote',
  templateUrl: './blocknote.page.html',
  styleUrls: ['./blocknote.page.scss'],
})
export class BlocknotePage implements OnInit {

  textValue: string;
  myShoppingList: ShoppingListItem[];

  constructor(private bnService: BnService) {
  }

  ngOnInit() {
    this.myShoppingList = this.bnService.myShoppingList;
  }

  ionViewWillLeave() {
    this.bnService.storeOnLocalStorage();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  addItem() {
    this.myShoppingList.push(new ShoppingListItem(false, ''));
  }

  removeItem(selId: number) {
    this.myShoppingList.splice(selId, 1);
  }

}
