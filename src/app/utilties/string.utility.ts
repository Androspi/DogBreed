export class StringUtility {

    static capitalizeFirst(text: string) {
        return `${(text[0] ?? '').toUpperCase()}${text.slice(1)}`;
    }

    static trim(text: string) {
        return (text ?? '').trim().replace(/\s\s+/g, ' ');
    }

}