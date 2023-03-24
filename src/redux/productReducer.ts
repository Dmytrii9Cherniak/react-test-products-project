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
        case Action_types.CREATE_NEW_PRODUCT:
            return { ...state, loading: true };
        case Action_types.CREATE_NEW_PRODUCT_ERROR:
            return { loading: false, error: action.payload, products: [...state.products] };
        case Action_types.CREATE_NEW_PRODUCT_SUCCESS:
            return { ...state, loading: false, products: [...state.products, action.payload] };
        case Action_types.UPDATE_EXISTS_PRODUCT:
            return { ...state, loading: true };
        case Action_types.UPDATE_EXISTS_PRODUCT_ERROR:
            return { ...state, loading: false, error: action.payload };
        case Action_types.UPDATE_EXISTS_PRODUCT_SUCCESS:
            const updatedProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            const updatedProducts = [...state.products];
            updatedProducts[updatedProductIndex] = action.payload;
            return { ...state, loading: false, products: updatedProducts };
        case Action_types.DELETE_EXISTS_PRODUCT:
            const deletedProductId = action.payload;
            const remainingProducts = state.products.filter(product => product.id !== deletedProductId);
            return { ...state, loading: false, products: remainingProducts };
        default:
            return state;
    }
}
