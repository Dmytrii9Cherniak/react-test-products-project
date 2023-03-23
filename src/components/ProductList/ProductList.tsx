import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../getUsers/productApiService';
import { ProductActionModel } from '../../models/ProductActionModel';
import { RootState } from '../../redux/all_reducers';
import { ThunkDispatch } from 'redux-thunk';
import { useTypesSelector } from '../../hooks/UseTypesSelector';
import './ProductList.scss';

function ProductList() {

    const { products, error, loading } = useTypesSelector(state => state.products);
    const dispatch: ThunkDispatch<RootState, void, ProductActionModel> = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts())
    },[])

    return (
        <div className="addProductsList">
            {error && <div> Something went wrong </div>}
            {loading && <div> Loading... </div>}
            {products.map(product => <div key={product.id}> {product.title} </div>)}

        </div>
    );
}

export default ProductList;
