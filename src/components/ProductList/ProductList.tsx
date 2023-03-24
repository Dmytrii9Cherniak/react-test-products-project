import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    findProductsByTitle,
    getAllCategories,
    getAllProducts,
    getProductsInCategory
} from '../../productService/productApiService';
import { ProductActionModel } from '../../models/ProductActionModel';
import { RootState } from '../../redux/all_reducers';
import { ThunkDispatch } from 'redux-thunk';
import { useTypesSelector } from '../../hooks/UseTypesSelector';
import Input from '../input/Input';
import './ProductList.scss';

function ProductList() {

    const { products, error, loading, categories } = useTypesSelector(state => state.products);
    const dispatch: ThunkDispatch<RootState, void, ProductActionModel> = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const [inputValue, setInputValue] = useState("");

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
            dispatch(getProductsInCategory());
        }
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(event.target.value);
    };

    let sortedProducts = [...products];

    switch (selectedSort) {
        case "expensive":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "cheap":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "rating":
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case "name":
            sortedProducts.sort((a,b) => a.title.localeCompare(b.title));
            break
        default:
            break;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setInputValue(title);
        if (title) {
            dispatch(findProductsByTitle(title));
            dispatch(getAllCategories())
        } else {
            dispatch(getAllProducts())
        }
    };

    return (
        <div className="addProductsList">
            <div className="sortItemsBlock">
                <select value={selectedSort} onChange={handleSortChange}>
                    <option value=""> Reset </option>
                    <option value="expensive"> From expensive to cheap </option>
                    <option value="cheap"> From cheap to expensive </option>
                    <option value="rating"> Sort by rating </option>
                    <option value="name"> Sort by name </option>
                </select>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <Input inputValue={inputValue} onInputChange={handleInputChange}/>
            </div>
            {error && !loading && <div className="errorLoadingOrNoProductsFound"> Something went wrong </div>}
            {!error && !loading && sortedProducts.length <= 0 && (
                <div className="errorLoadingOrNoProductsFound"> No products found </div>
            )}
            {(loading && sortedProducts.length <= 0 && !error) && (
                <div className="errorLoadingOrNoProductsFound"> Loading... </div>
            )}
            {!error && !loading && sortedProducts.length > 0 && (
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
                    {sortedProducts.map((product) => product && (
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
