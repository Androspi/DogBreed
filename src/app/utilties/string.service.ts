import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringUtility {

    capitalizeFirst(text: string) {
        return `${(text[0] ?? '').toUpperCase()}${text.slice(1)}`;
    }

    trim(text: string) {
        return (text ?? '').trim().replace(/\s\s+/g, ' ');
    }

}