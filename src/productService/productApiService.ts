import { Action_types } from '../redux/action_types';
import { Dispatch } from 'redux';
import { ProductActionModel } from '../models/ProductActionModel';
import { environment } from '../environment';
import { NewProductModel } from '../models/NewProductModel';
import { RootState } from '../redux/all_reducers';
import { ProductModel } from '../models/ProductModel';


export const createNewProduct = (body: NewProductModel) => {
    return async (dispatch: Dispatch<ProductActionModel>) => {
        try {
            dispatch({ type: Action_types.CREATE_NEW_PRODUCT });
            const response = await fetch(`${environment.baseApiUrl}/products/add`, {
                method: 'POST',
                body: JSON.stringify(body)
            }).then(res => res.json());
            dispatch({ type: Action_types.CREATE_NEW_PRODUCT_SUCCESS, payload: response.product });
        } catch (error) {
            dispatch({ type: Action_types.CREATE_NEW_PRODUCT_ERROR, payload: 'Something went wrong' });
        }
    }
}

export const getAllCategories = () => {
    return async (dispatch: Dispatch<ProductActionModel>, getState: () => RootState) => {
        try {
            dispatch({ type: Action_types.GET_ALL_CATEGORIES });
            const response = await fetch(`${environment.baseApiUrl}/products/categories`).then(res => res.json());
            const state = getState();
            dispatch({ type: Action_types.GET_ALL_CATEGORIES_SUCCESS, payload: [...state.products.categories, ...response] });
        } catch (error) {
            dispatch({ type: Action_types.GET_ALL_CATEGORIES_ERROR, payload: 'Something went wrong'})
        }
    }
}

export const getAllProducts = () => {
    return async (dispatch: Dispatch<ProductActionModel>) => {
        try {
            dispatch({ type: Action_types.GET_ALL_PRODUCTS });
            const response = await fetch(`${environment.baseApiUrl}/products`).then(response => response.json());
            dispatch({ type: Action_types.GET_PRODUCTS_SUCCESS, payload: response.products })
        } catch (e) {
            dispatch({ type: Action_types.GET_PRODUCTS_ERROR, payload: 'Something went wrong' });
        }
    }
}

export const getProductsInCategory = (category: string = "") => {
    return async (dispatch: Dispatch<ProductActionModel>) => {
        try {
            dispatch({ type: Action_types.GET_PRODUCTS_IN_CATEGORY});
            const url = category ? `${environment.baseApiUrl}/products/category/${category}` : `${environment.baseApiUrl}/products`;
            const response = await fetch(url).then(response => response.json());
            dispatch({ type: Action_types.GET_PRODUCTS_IN_CATEGORY_SUCCESS, payload: response.products })
        } catch (error) {
            dispatch({type: Action_types.GET_PRODUCTS_IN_CATEGORY_ERROR, payload: 'Something went wrong'})
        }
    }
}

export const findProductsByTitle = (title: string) => {
    return async (dispatch: Dispatch<ProductActionModel>) => {
        try {
            dispatch({ type: Action_types.FIND_PRODUCTS_BY_TITLE });
            const url = `${environment.baseApiUrl}/products/search?q=${title}`;
            const response = await fetch(url).then((response) => response.json());
            const products = response.products.filter(
                (product: ProductModel) => {
                    const titleChars = product.title.toLowerCase().split('');
                    const searchChars = title.toLowerCase().split('');
                    return searchChars.every((char, index) => titleChars[index] === char);
                }
            );
            dispatch({
                type: Action_types.FIND_PRODUCTS_BY_TITLE_SUCCESS,
                payload: products,
            });
        } catch (error) {
            dispatch({
                type: Action_types.FIND_PRODUCTS_BY_TITLE_ERROR,
                payload: "Something went wrong",
            });
        }
    };
};

