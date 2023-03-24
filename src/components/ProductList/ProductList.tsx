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
        dispatch(getAllProducts());
    },[dispatch])

    return (
        <div className="addProductsList">
            {error && <div className="errorOrLoading"> Something went wrong </div>}
            {(loading || products.length <= 0) && <div className="errorOrLoading"> Loading... </div>}
            {!error && !loading && products.length > 0 && (
                <table>
                    <thead>
                    <tr className="headOfTable">
                        <th> Id </th>
                        <th> Name </th>
                        <th> Description </th>
                        <th> Price </th>
                        <th> Photo </th>
                        <th> Rating </th>
                        <th> Stock </th>
                        <th> Category </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => product &&
                        <tr className="tableProductItem" key={product.id}>
                            <td> {product.id} </td>
                            <td> {product.title} </td>
                            <td> {product.description} </td>
                            <td> {product.price} </td>
                            <td> <img src={product.images[0]} alt={product.title}/> </td>
                            <td> {product.rating} </td>
                            <td> {product.stock} </td>
                            <td> {product.category} </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductList;
