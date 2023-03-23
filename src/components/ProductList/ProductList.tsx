import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../getUsers/getProducts';
import { ProductActionModel } from '../../models/ProductActionModel';
import { RootState } from '../../redux/all_reducers';
import { ThunkDispatch } from 'redux-thunk';
import { useTypesSelector } from '../../hooks/UseTypesSelector';
import './ProductList.scss';

function ProductList() {

    const { products, error, loading } = useTypesSelector(state => state.products);
    const dispatch: ThunkDispatch<RootState, void, ProductActionModel> = useDispatch();

    console.log(products)

    useEffect(() => {
        dispatch(getProducts())
    },[])

    return (
        <div className="addProductsList">
            {error && <div> Something went wrong </div>}
            {loading && <div> Loading... </div>}
            {/*{products.map(el => <div key={el.id}> {el.title} </div>)}*/}
            {products.map(el => <table className="customers">
                <tr key={el.id}>
                    <th> {el.title} </th>
                    <th> {el.rating} </th>
                    <th> {el.price} </th>
                </tr>
            </table>)}

        </div>
    );
}

export default ProductList;
