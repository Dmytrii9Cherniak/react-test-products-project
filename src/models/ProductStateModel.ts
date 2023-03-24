import { ProductModel } from './ProductModel';


export interface ProductsStateModel {
    products: ProductModel[],
    loading: boolean,
    error: string | null
}
