import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setSelected} from '../store/products.store';
import { addItem } from '../store/cart.store';
import { ProductItemProps } from '../types/products.type';

export const Product: React.FC<ProductItemProps> = (props) => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    
    return (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2 mt-3">
            <div className="card">
                {
                    props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) === 1
                    ?
                        <span className="position-absolute translate-middle badge rounded-circle bg-danger border border-dark pt-2 pb-2" style={{'left': '3%', 'fontSize': '0.6rem', 'paddingLeft': '0.1rem', 'paddingRight': '0.1rem'}}>
                            LAST
                        </span>
                    :
                        ''
                }
                <img src={props.image} className="card-img-top" height={100} alt={props.name} />
                <div style={{'width': '100%', 'height': '1px', 'backgroundColor': 'gray'}} />
                <div className="card-body py-0">
                    <p className="mt-2 mb-0" style={{'fontSize': '0.8rem'}}><b>{props.name}</b></p>
                    <p className="mb-1" style={{'fontSize': '0.6rem'}}>{props.code}</p>
                    <p className="mb-1" style={{'fontSize': '0.6rem'}}>Qty: <b style={{'color': props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) === 1 ? 'red' : 'black'}}>{props.stock.map(stock => stock.quantity).reduce((a, b) => a + b)}</b>
                        {
                            props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) === 0
                            ?
                                ''
                            :
                                props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) === 1
                                ?
                                    <span style={{'color': 'red'}}> Last piece, buy it now!</span>
                                :
                                    props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) <= 3
                                    ?
                                        <span style={{'color': 'red'}}> Last pieces available!</span>
                                    :
                                        ''
                        }
                    </p>
                    <p className="mb-1" style={{'fontSize': '0.6rem'}}>Price: {props.oldPrice ? <span className="text-decoration-line-through">€ {props.oldPrice.toFixed(2).replace('.', ',')}</span> : ''} <b>€ {props.newPrice.toFixed(2).replace('.', ',')}<b/></b></p>
                    <div className="row mt-3 mb-2">
                        {
                            props.stock.length > 1 && props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) > 0
                            ?
                                <div className="col-8">
                                    <select onChange={(event) => dispatch(setSelected({itemId: props.id, selectedIndex: event.target.selectedIndex-1}))} className="form-control form-control-sm float-start">
                                        <option defaultValue={0} hidden>Select size</option>
                                        {
                                            props.stock.map(stock =>
                                                stock.quantity === 0
                                                ?
                                                    <option key={stock.size} disabled>{stock.size} ({stock.quantity} pcs)</option>
                                                :
                                                    <option key={stock.size}>{stock.size} ({stock.quantity} pcs)</option>
                                            )
                                        }
                                    </select>
                                </div>
                            :
                                ''
                        }
                        <div className={props.stock.length > 1 && props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) > 0 ? 'col-4' : 'col-12'}>
                            {
                                props.stock.map(stock => stock.quantity).reduce((a, b) => a + b) === 0
                                ?
                                    <button type="button" className="btn btn-secondary btn-sm float-end disabled">Added all</button>
                                :
                                    <button onClick={() => dispatch(addItem(products.items[products.items.findIndex(item => item.id === props.id)]))} type="button" className={products.items[products.items.findIndex(item => item.id === props.id)].selected === false && props.stock.length > 1 ? 'btn btn-primary btn-sm float-end disabled' : 'btn btn-primary btn-sm float-end'}>Add</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
