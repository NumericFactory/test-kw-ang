/**
 * Search value object
 * 
 * used to format query string on api call. Exemple :
 * apiURl.com/category/:category?sortBy=price&order=asc
 * 
 * this object is shared accross product feature
 * searchbar component, product.store, and product.service
 */
export type searchValueObject = {
    category: string;
    sortBy: 'price' | 'title' | '';
    order: 'asc' | 'desc' | '';
};
