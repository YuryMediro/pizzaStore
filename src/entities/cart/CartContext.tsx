import type { CartItem, Pizza } from '@/shared/types/pizza'
import { createContext, useContext } from 'react'
import { useCart } from './useCart'

type CartContextType = {
	cart: CartItem[]
	addToCart: (pizza: Pizza, selectedIngredients: string[]) => void
	removeFromCart: (itemId: string, selectedIngredients: string[]) => void
	getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCartContext = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCartProvider must be used within a CartProvider')
	}
	return context
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const cart = useCart()

	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}
