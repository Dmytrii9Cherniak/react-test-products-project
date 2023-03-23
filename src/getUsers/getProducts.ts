import { Action_types } from '../redux/action_types';
import { Dispatch } from 'redux';
import { ProductActionModel } from '../models/ProductActionModel';
import { environment } from '../environment';


export const getProducts = () => {
    return async (dispatch: Dispatch<ProductActionModel>) => {
        try {
            dispatch({ type: Action_types.GET_ALL_PRODUCTS });
            const response = await fetch(`${environment.baseApiUrl}/products`).then(response => response.json())
            dispatch({ type: Action_types.GET_PRODUCTS_SUCCESS, payload: response.products })
        } catch (e) {
            dispatch({ type: Action_types.GET_PRODUCTS_ERROR, payload: 'Something went wrong' });
        }
    }
}
