import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.scss'

export function Header() {

    const location = useLocation();
    const isNewProductPage = location.pathname === '/new';

    return (<header className="header">
        {isNewProductPage ?
            <button>
                <Link to="/products"> Back to products </Link>
            </button> :
            <button>
                <Link to="/new"> Create new product </Link>
            </button>
        }
            </header>);
}
