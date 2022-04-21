export interface ProductItemStockProps {
    size: number,
    quantity: number
}

export interface ProductItemProps {
    id: number,
    code: string,
    name: string,
    image: string,
    oldPrice?: number,
    newPrice: number,
    stock: ProductItemStockProps[],
    selected: boolean,
    selectedIndex: number
}

export interface ProductsProps {
    items: ProductItemProps[]
}
