export interface CartItemProps {
    id: number,
    code: string,
    name: string,
    price: number,
    size: number,
    quantity: number
}

export interface CartProps {
    items: CartItemProps[]
}
