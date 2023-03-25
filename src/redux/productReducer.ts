import { ProductsStateModel } from '../models/ProductStateModel';
import {
    Action_types
} from './action_types';
import { ProductActionModel } from '../models/ProductActionModel';

const initialState: ProductsStateModel = {
    products: [],
    categories: [],
    loading: false,
    error: null
}

export const ProductReducer = (state = initialState, action: ProductActionModel): ProductsStateModel => {
    switch (action.type) {

        case Action_types.GET_ALL_PRODUCTS:
            return { loading: true, error: null, products: [], categories: [] }
        case Action_types.GET_PRODUCTS_ERROR:
            return { loading: false, error: action.payload, products: [], categories: [] }
        case Action_types.GET_PRODUCTS_SUCCESS:
            return { loading: false, error: null, products: action.payload, categories: [] }

        case Action_types.GET_ALL_CATEGORIES:
            return state;
        case Action_types.GET_ALL_CATEGORIES_ERROR:
            return state;
        case Action_types.GET_ALL_CATEGORIES_SUCCESS:
            return { ...state, categories: [...state.categories, ...action.payload] }

        case Action_types.GET_PRODUCTS_IN_CATEGORY:
            return { ...state, loading: true, error: null, products: [] };
        case Action_types.GET_PRODUCTS_IN_CATEGORY_ERROR:
            return { ...state, loading: false, error: action.payload };
        case Action_types.GET_PRODUCTS_IN_CATEGORY_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };

        case Action_types.CREATE_NEW_PRODUCT:
            return { ...state, loading: true };
        case Action_types.CREATE_NEW_PRODUCT_ERROR:
            return { loading: false, error: action.payload, products: [...state.products], categories: [] };
        case Action_types.CREATE_NEW_PRODUCT_SUCCESS:
            return { ...state, loading: false, products: [...state.products, action.payload] };

        case Action_types.FIND_PRODUCTS_BY_TITLE:
            return { ...state, loading: true, error: null };
        case Action_types.FIND_PRODUCTS_BY_TITLE_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case Action_types.FIND_PRODUCTS_BY_TITLE_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
