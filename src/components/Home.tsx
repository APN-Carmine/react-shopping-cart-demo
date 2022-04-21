import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, resetSelected } from '../store/products.store';
import { selectCart } from '../store/cart.store';
import { Header } from './Header';
import { Product } from './Product';
import { NavLink } from 'react-router-dom';

export const Home: React.FC = () => {
    
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const cart = useSelector(selectCart);

    return (
        <>
            <div className="container pb-5 mb-5">
                <Header
                    leftText='LAST PRODUCTS AVAILABLE'
                    rightText={products.items.length + ' products available'}
                />
                <div className="row gx-3 mx-2">
                    {
                        products.items.map(product => 
                            <Product
                                key={product.id}
                                id={product.id}
                                code={product.code}
                                name={product.name}
                                image={product.image}
                                oldPrice={product.oldPrice}
                                newPrice={product.newPrice}
                                stock={product.stock}
                                selected={false}
                                selectedIndex={0}
                            />
                        )
                    }
                </div>
            </div>
            <div className="container-fluid fixed-bottom bg-light border-top">
                <div className="col-12">
                    <NavLink to="/cart">
                        <button onClick={() => dispatch(resetSelected())} type="button" className="btn btn-primary btn-md my-3 mx-2 float-end" >Go to Cart</button>
                    </NavLink>
                    <p className="user-select-none my-4 mx-2 float-end" style={{'fontSize': '0.9rem'}}>{cart.items.filter((item, index) => cart.items.findIndex(item1 => item1.id === item.id) === index).length} products added</p>
                </div>
            </div>
        </>
    );
}
