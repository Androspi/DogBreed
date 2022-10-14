import { Pipe, PipeTransform } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Pipe({ name: 'masonry' })
export class MasonryPipe implements PipeTransform {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * separate a list by columns and get the generated value in a column
   * @see https://javascript.plainenglish.io/masonry-layouts-with-angular-71c0b5a80c36
   * @param value list
   * @param numColumns number of columns
   * @param colNum column target
   * @returns list in column
   */
  transform<T extends any>(value: T[], numColumns: number, colNum: number): T[] {
    if (!value.length) return value;

    if (numColumns < 1 || colNum < 1 || isNaN(numColumns) || isNaN(colNum) || colNum > numColumns) {
      this.snackBar.open('Invalid column configuration', 'Ok');
      return value;
    }

    return value.filter((val, index) => index % numColumns === colNum - 1);
  }
} 
