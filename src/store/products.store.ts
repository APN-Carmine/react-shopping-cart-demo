import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProductsProps } from "../types/products.type";
import { CartItemProps } from "../types/cart.type";
import img1 from '../img/p1.jpg';
import img2 from '../img/p2.jpg';
import img3 from '../img/p3.jpg';
import img4 from '../img/p4.jpg';
import img5 from '../img/p5.jpg';

const initialState: ProductsProps = {
    items : [
        {
            id: 1,
            code: "RB3210 2112A",
            name: "Ray-Ban Wayfarer",
            image: img1,
            oldPrice: 152.00,
            newPrice: 121.60,
            stock: [
                {
                    size: 50,
                    quantity: 1
                },
                {
                    size: 52,
                    quantity: 0
                }
            ],
            selected: false,
            selectedIndex: 0
        },
        {
            id: 2,
            code: "RB9210 1149",
            name: "Ray-Ban Round",
            image: img2,
            newPrice: 166.00,
            stock: [
                {
                    size: 50,
                    quantity: 1
                },
                {
                    size: 52,
                    quantity: 3
                }
            ],
            selected: false,
            selectedIndex: 0
        },
        {
            id: 3,
            code: "RB3594 9093C8 53",
            name: "Ray-Ban Clubmaster",
            image: img3,
            newPrice: 152.00,
            stock: [
                {
                    size: 50,
                    quantity: 1
                },
                {
                    size: 52,
                    quantity: 2
                }
            ],
            selected: false,
            selectedIndex: 0
        },
        {
            id: 4,
            code: "RB3594 2345 53",
            name: "Ray-Ban RB3594",
            image: img4,
            newPrice: 250.90,
            stock: [
                {
                    size: 53,
                    quantity: 1
                }
            ],
            selected: false,
            selectedIndex: 0
        },
        {
            id: 5,
            code: "RB6211 5122A 50",
            name: "Ray-Ban Aviator",
            image: img5,
            newPrice: 150.90,
            stock: [
                {
                    size: 50,
                    quantity: 3
                }
            ],
            selected: false,
            selectedIndex: 0
        }
    ]
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        removeItems: (state, action) => {
            action.payload.map((item: CartItemProps) => {
                let index = state.items.findIndex(item1 => item1.id === item.id);
                if(index !== -1){
                    let index1 = state.items[index].stock.findIndex(item2 => item2.size === item.size);
                    if(index1 !== -1){
                        state.items[index].stock[index1].quantity = state.items[index].stock[index1].quantity - item.quantity;
                    }
                }
            });
        },
        setSelected: (state, action) => {
            let index = state.items.findIndex(item => item.id === action.payload.itemId);
            if(index !== -1){
                state.items[index].selected = true;
                state.items[index].selectedIndex = action.payload.selectedIndex;
            }
        },
        resetSelected: (state) => {
            state.items.map(item => {
                item.selected = false;
                item.selectedIndex = 0;
            });
        }
    }
});

export const { removeItems, setSelected, resetSelected } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products;
