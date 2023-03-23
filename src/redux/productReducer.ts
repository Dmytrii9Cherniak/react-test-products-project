import { ProductsStateModel } from '../models/ProductStateModel';
import {
    Action_types
} from './action_types';
import { ProductActionModel } from '../models/ProductActionModel';

const initialState: ProductsStateModel = {
    products: [],
    loading: false,
    error: null
}

export const ProductReducer = (state = initialState, action: ProductActionModel): ProductsStateModel => {
    switch (action.type) {
        case Action_types.GET_ALL_PRODUCTS:
            return { loading: true, error: null, products: [] }
        case Action_types.GET_PRODUCTS_ERROR:
            return { loading: false, error: action.payload, products: [] }
        case Action_types.GET_PRODUCTS_SUCCESS:
            return { loading: false, error: null, products: action.payload }
        default:
            return state;
    }
}
