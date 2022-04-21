import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CartProps, CartItemProps } from "../types/cart.type";

const initialState: CartProps = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            let index = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.stock[action.payload.selectedIndex].size);
            if(index !== -1){
                if(action.payload.stock[action.payload.selectedIndex].quantity > state.items[index].quantity){
                    state.items[index].quantity++;
                }
            }else{
                let itemToAdd: CartItemProps = {
                    id: action.payload.id,
                    code: action.payload.code,
                    name: action.payload.name,
                    price: action.payload.newPrice,
                    size: action.payload.stock[action.payload.selectedIndex].size,
                    quantity: 1
                };
                state.items = state.items.concat(itemToAdd);
            }
        },
        increaseItem: (state, action) => {
            let index = state.items.findIndex(item => item.id === action.payload.itemId && item.size === action.payload.itemSize);
            if(index !== -1){
                state.items[index].quantity++;
            }
        },
        decreaseItem: (state, action) => {
            let index = state.items.findIndex(item => item.id === action.payload.itemId && item.size === action.payload.itemSize);
            if(index !== -1){
                state.items[index].quantity--;
                state.items = state.items.filter(item => item.quantity > 0);
            }
        },
        clearItems: () => initialState
    }
});

export const { addItem, increaseItem, decreaseItem, clearItems } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart;
