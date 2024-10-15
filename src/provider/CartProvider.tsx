import { createContext, PropsWithChildren, useContext, useState } from "react";
import {Text, View} from 'react-native'
import { CartItem, Product } from "../types";
import {randomUUID} from 'expo-crypto'

// Create a context for the cart
type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1 ) => void;
    total: number;
}
export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
});

// CartProvider component to wrap the app
const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

   
    // Add new Item in a cart
    const addItem = (product: Product, size: CartItem['size']) =>{


         // Already product is in cart 
         const existingItem = items.find(
            (item) => item.product === product && item.size === size
          );
        
          if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
          }

        const newCartItem:CartItem ={
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity:1,

        }
        setItems([newCartItem, ...items])
    }


    // Updating Quantity of a cart
    const updateQuantity = (itemId: string, amount: -1 | 1 ) => {
        const updatedItems = items.map(item => item.id !== itemId ? item : {...item, quantity: item.quantity + amount}).filter( (item) => item.quantity > 0)
        setItems(updatedItems);
    }
    const total = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity),
        0
      );
    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
           <View style={{ flex: 1 }}>{children}</View>
        </CartContext.Provider>
    );
};

export default CartProvider;
 export const useCart = ()=>useContext(CartContext)