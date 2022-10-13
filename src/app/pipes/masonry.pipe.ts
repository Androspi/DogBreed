import { Pipe, PipeTransform } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Pipe({ name: 'masonry' })
export class MasonryPipe implements PipeTransform {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  transform<T extends any>(value: T[], numColumns: number, colNum: number): T[] {
    if (!value.length) return value;

    if (numColumns < 1 || colNum < 1 || isNaN(numColumns) || isNaN(colNum) || colNum > numColumns) {
      this.snackBar.open('Invalid column configuration', 'Ok');
      return value;
    }

    return value.filter((val, index) => index % numColumns === colNum - 1);
  }
} 
