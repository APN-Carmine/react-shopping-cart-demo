import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, clearItems } from '../store/cart.store';
import { Header } from './Header';
import { NavLink } from 'react-router-dom';

export const Success: React.FC = () => {

    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    return (
        <>
            <div className="container pb-5 mb-5">
                <Header />
                <div className="col-12 border rounded-3 text-center mt-3 py-5">
                    <h5>Thank you!</h5>
                    <h5 className="my-5">Your {cart.items.filter((item, index) => cart.items.findIndex(item1 => item1.id === item.id) === index).length} products will be shipped soon</h5>
                    <NavLink to="/">
                        <button onClick={() => dispatch(clearItems())} type="button" className="btn btn-primary btn-md" >Buy more</button>
                    </NavLink>
                </div>
            </div>
            <div className="container-fluid fixed-bottom bg-light border-top">
                <div className="col-12">
                    <NavLink to="/">
                        <button onClick={() => dispatch(clearItems())} type="button" className="btn btn-primary btn-md my-3 float-end" >Buy more</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
