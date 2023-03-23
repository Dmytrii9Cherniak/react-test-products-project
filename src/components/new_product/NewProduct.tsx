import React from 'react';
import './NewProduct.scss'

function NewProduct() {

    return (<div className="newProductPage">
        <form>
            <label htmlFor="name"> Name </label>
            <input id="name" type="text" />

            <label htmlFor="author"> Author </label>
            <input id="author" type="text" />

            <label htmlFor="year"> Year of publication </label>
            <input id="year" type="date" />

            <label htmlFor="rating"> Rating </label>
            <input id="rating" type="number" />
            <button> Create </button>
        </form>
            </div>);
}

export default NewProduct;
