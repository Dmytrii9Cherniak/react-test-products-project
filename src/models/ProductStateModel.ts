import { ProductModel } from './ProductModel';


export interface ProductsStateModel {
    products: ProductModel[],
    categories: string[];
    loading: boolean,
    error: string | null,
    selectedCategory?: null
}
