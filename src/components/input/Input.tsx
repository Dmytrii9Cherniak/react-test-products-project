import React from 'react';
import { InputPropsModel } from '../../models/InputPropsModel';
import './Input.scss'

function Input({ inputValue, onInputChange }: InputPropsModel) {

    return (
        <div className="inputBlock">
            <input className="input" type="text" value={inputValue} onChange={onInputChange}/>
        </div>
    );
}

export default Input;
