import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {getAllCategories, getAllProducts, getProductsInCategory} from '../../productService/productApiService';
import { ProductActionModel } from '../../models/ProductActionModel';
import { RootState } from '../../redux/all_reducers';
import { ThunkDispatch } from 'redux-thunk';
import { useTypesSelector } from '../../hooks/UseTypesSelector';
import './ProductList.scss';

function ProductList() {

    const { products, error, loading, categories } = useTypesSelector(state => state.products);
    const dispatch: ThunkDispatch<RootState, void, ProductActionModel> = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        dispatch(getAllProducts()).then(() => {
            dispatch(getAllCategories());
        });
    }, [dispatch]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        if (event.target.value) {
            dispatch(getProductsInCategory(event.target.value));
        } else {
            dispatch(getAllProducts());
        }
    };

    return (
        <div className="addProductsList">
            <div className="sortItemsBlock">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input />
            </div>
            {error && <div className="errorOrLoading">Something went wrong</div>}
            {(loading || products.length <= 0) && (
                <div className="errorOrLoading">Loading...</div>
            )}
            {!error && !loading && products.length > 0 && (
                <table>
                    <thead>
                    <tr className="headOfTable">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Photo</th>
                        <th>Rating</th>
                        <th>Stock</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(
                        (product) =>
                            product && (
                                <tr className="tableProductItem" key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <img src={product.images[0]} alt={product.title} />
                                    </td>
                                    <td>{product.rating}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category}</td>
                                </tr>
                            )
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductList;
