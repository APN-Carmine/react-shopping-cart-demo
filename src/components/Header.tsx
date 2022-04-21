import React from 'react';
import { HeaderProps } from '../types/generics.type';

export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <>
            <h2 className="text-center mt-5">STORE LOGO</h2>
            {
                props.leftText && props.rightText
                ?
                    <>
                        <div className="row mt-5">
                            <div className="col-6">
                                <h4 className="float-start">{props.leftText}</h4>
                            </div>
                            <div className="col-6 mt-2">
                                <p className="float-end" style={{'fontSize': '0.8rem'}}>{props.rightText}</p>
                            </div>
                        </div>
                        <div style={{'width': '100%', 'height': '1px', 'backgroundColor': 'black'}} />
                    </>
                :
                    <div style={{'width': '100%', 'height': '1px', 'backgroundColor': 'black', 'marginTop': '5.7rem'}} />
            }
        </>
    );
}
