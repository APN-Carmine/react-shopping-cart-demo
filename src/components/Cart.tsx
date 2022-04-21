import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, removeItems } from '../store/products.store';
import { selectCart, increaseItem, decreaseItem } from '../store/cart.store';
import { Header } from './Header';
import { NavLink } from 'react-router-dom';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

export const Cart: React.FC = () => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const cart = useSelector(selectCart);

    return (
        <>
            <div className="container pb-5 mb-5">
                <Header
                    leftText='CART'
                    rightText={cart.items.filter((item, index) => cart.items.findIndex(item1 => item1.id === item.id) === index).length + ' products added'}
                />
                <div className="col-12 border rounded-3 mt-3 py-4 px-4">
                    {
                        cart.items.length > 0
                        ?
                            <>
                                <h5>Your cart contains:</h5>
                                <table className="table table-bordered mt-4">
                                    <thead>
                                        <tr>
                                            <th scope="col">Model</th>
                                            <th scope="col">SKU</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.items.map(item => 
                                                <tr key={`${item['id']}-${item['size']}`}>
                                                    <td className="py-3">{item['name']} <span onClick={() => dispatch(decreaseItem({itemId: item['id'], itemSize: item['size']}))} style={{'fontSize': '0.9rem'}} className='text-danger user-select-none float-end'>Remove <BsDashCircle /></span></td>
                                                    <td className="py-3">{item['code']}</td>
                                                    <td className="py-3">{item['size']}</td>
                                                    <td className="py-3">{item['quantity']} {products.items[products.items.findIndex(item1 => item1.id === item.id)].stock[products.items[products.items.findIndex(item1 => item1.id === item.id)].stock.findIndex(item2 => item2.size === item.size)].quantity > item.quantity ? <span onClick={() => dispatch(increaseItem({itemId: item['id'], itemSize: item['size']}))} style={{'fontSize': '0.9rem'}} className='text-primary user-select-none float-end'>Add <BsPlusCircle /></span> : ''}</td>
                                                    <td className="py-3">€ {(item['price']*item['quantity']).toFixed(2).replace('.', ',')}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                    <div className="row">
                                        <div className="col-8 offset-4 col-md-6 offset-md-6 col-xl-4 offset-xl-8">
                                            <p className="text-decoration-underline ms-5 float-start">Total pieces:</p>
                                            <b className="me-5 float-end">{cart.items.map(item => item.quantity).reduce((a, b) => a + b)}</b>
                                        </div>
                                        <div className="col-8 offset-4 col-md-6 offset-md-6 col-xl-4 offset-xl-8">
                                            <p className="text-decoration-underline ms-5 float-start">Total price:</p>
                                            <b className="me-5 float-end">€ {cart.items.map(item => item.price*item.quantity).reduce((a, b) => a + b).toFixed(2).replace('.', ',')}</b>
                                        </div>
                                    </div>
                            </>
                        :
                            <h5>Your cart is empty</h5>
                    }
                </div>
            </div>
            <div className="container-fluid fixed-bottom bg-light border-top">
                <div className="col-12">
                    <NavLink to="/">
                        <h6 className="text-dark my-4 mx-1 float-start"><IoChevronBackCircleOutline /></h6>
                        <p className="text-dark user-select-none my-4 float-start" style={{'fontSize': '0.9rem'}}>Back</p>
                    </NavLink>
                    <NavLink to="/success">
                        <button onClick={() => dispatch(removeItems(cart.items))} type="button" className={cart.items.length > 0 ? 'btn btn-primary btn-md my-3 mx-2 float-end' : 'btn btn-primary btn-md my-3 mx-2 float-end disabled'}>Checkout</button>
                    </NavLink>
                    <p className="user-select-none my-4 mx-2 float-end" style={{'fontSize': '0.9rem'}}>{cart.items.filter((item, index) => cart.items.findIndex(item1 => item1.id === item.id) === index).length} products added</p>
                </div>
            </div>
        </>
    );
}
