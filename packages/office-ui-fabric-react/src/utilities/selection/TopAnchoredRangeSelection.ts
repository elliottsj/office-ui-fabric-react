import {
  IObjectWithKey,
  ISelection,
  SELECTION_CHANGE,
  SelectionMode
} from './interfaces';
import { Selection } from './Selection';
import { EventGroup } from '../../Utilities';

export interface ITopAnchoredRangeSelectionOptions {
  onSelectionChanged?: () => void;
}

/**
 * An ISelection which is permanently anchored to the top of the list.
 * Selecting any list item will also cause all preceding items to become selected.
 *
 * This is implemented by proxying most methods to an internal Selection instance,
 * and providing custom behavior for a few methods.
 */
export class TopAnchoredRangeSelection implements ISelection {
  public readonly mode: SelectionMode = SelectionMode.multiple;

  private _selection: ISelection;

  constructor(options: ITopAnchoredRangeSelectionOptions = {}) {
    this._selection = new Selection({
      onSelectionChanged: () => {
        EventGroup.raise(this, SELECTION_CHANGE);
        if (options.onSelectionChanged) {
          options.onSelectionChanged();
        }
      }
    });
  }

  /**
   * Toggle selection of the item at the given index. This is called when a list item's checkbox
   * is clicked.
   */
  public toggleIndexSelected(index: number): void {
    if (this._isIndexLastInSelectedRange(index)) {
      this._selection.setIndexSelected(index, false, false);
    } else {
      this._setRangeSelected(0, index);
    }
  }

  /**
   * Toggle selection in a range. This is called when list group headers are clicked.
   */
  public toggleRangeSelected(fromIndex: number, count: number): void {
    if (!this.isRangeSelected(fromIndex, count)) {
      // Some item in range is not selected; select it
      this.toggleIndexSelected(fromIndex + count - 1);
      return;
    }
    if (fromIndex === 0) {
      // All items in range are selected, and range begins at list start; deselect all items
      this.setAllSelected(false);
      return;
    }
    // All items in range are selected, and range is past list start; select up to the preceding item
    this.toggleIndexSelected(fromIndex - 1);
  }

  /*
   * Proxy remaining methods to Selection instance
   */

  public get count(): number {
    return this._selection.count;
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

  private _isIndexLastInSelectedRange(index: number) {
    return this.getSelectedCount() === index + 1;
  }
  private _setRangeSelected(fromIndex: number, toIndex: number) {
    this._selection.setIndexSelected(0, true, true);
    this._selection.selectToIndex(toIndex, true);
  }
}
