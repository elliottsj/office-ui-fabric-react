import { IObjectWithKey, ISelection, SELECTION_CHANGE, SelectionMode } from './interfaces';
import { Selection } from './Selection';
import { EventGroup } from '../../Utilities';

export interface IAnchoredRangeSelectionOptions { }

export class AnchoredRangeSelection implements ISelection {
  public count: number;
  public readonly mode: SelectionMode = SelectionMode.multiple;

  private _selection: ISelection;

  constructor(options: IAnchoredRangeSelectionOptions = {}) {
    this._selection = new Selection();
  }

  public canSelectItem(item: IObjectWithKey): boolean {
    return this._selection.canSelectItem(item);
  }

  public setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void {
    return this._selection.setChangeEvents(isEnabled, suppressChange);
  }

  public setItems(items: IObjectWithKey[], shouldClear: boolean): void {
    return this._selection.setItems(items, shouldClear);
  }
  public getItems(): IObjectWithKey[] {
    return this._selection.getItems();
  }

  public getSelection(): IObjectWithKey[] {
    return this._selection.getSelection();
  }
  public getSelectedCount(): number {
    return this._selection.getSelectedCount();
  }
  public isRangeSelected(fromIndex: number, count: number): boolean {
    return this._selection.isRangeSelected(fromIndex, count);
  }

  public isAllSelected(): boolean {
    return this._selection.isAllSelected();
  }
  public isKeySelected(key: string): boolean {
    return this._selection.isKeySelected(key);
  }
  public isIndexSelected(index: number): boolean {
    return this._selection.isIndexSelected(index);
  }

  public setAllSelected(isAllSelected: boolean): void {
    return this._selection.setAllSelected(isAllSelected);
  }
  public setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void {
    return this._selection.setKeySelected(key, isSelected, shouldAnchor);
  }
  public setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
    return this._selection.setIndexSelected(index, isSelected, shouldAnchor);
  }

  public selectToKey(key: string, clearSelection?: boolean): void {
    return this._selection.selectToKey(key, clearSelection);
  }
  public selectToIndex(index: number, clearSelection?: boolean): void {
    return this._selection.selectToIndex(index, clearSelection);
  }

  public toggleAllSelected(): void {
    return this._selection.toggleAllSelected();
  }
  public toggleKeySelected(key: string): void {
    return this._selection.toggleKeySelected(key);
  }
  public toggleIndexSelected(index: number): void {
    return this._selection.toggleIndexSelected(index);
  }
  public toggleRangeSelected(fromIndex: number, count: number): void {
    return this._selection.toggleRangeSelected(fromIndex, count);
  }
}
