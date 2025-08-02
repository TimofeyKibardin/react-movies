export interface ApiItem {
    imdbID: string;
    Title: string;
    Year?: string; // необязательное поле
    [key: string]: unknown;
}