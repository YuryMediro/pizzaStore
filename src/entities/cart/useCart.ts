import { calculateItemPrice } from '@/shared/lib/calculateItemPrice'
import type { CartItem, Pizza } from '@/shared/types/pizza'
import { useEffect, useState } from 'react'

export const useCart = () => {
	const [cart, setCart] = useState<CartItem[]>([])

	useEffect(() => {
		const savedCart = localStorage.getItem('pizza-cart')
		if (savedCart) {
			setCart(JSON.parse(savedCart))
		}
	}, [])

	const saveCart = (newCart: CartItem[]) => {
		setCart(newCart)
		localStorage.setItem('pizza-cart', JSON.stringify(newCart))
	}

	const addToCart = (
		pizza: Pizza,
		selectedIngredients: string[],
		quantity: number = 1
	) => {
		const existingItem = cart.findIndex(
			item =>
				item.id === pizza.id &&
				JSON.stringify(item.selectedIngredients) ===
					JSON.stringify(selectedIngredients)
		)

		if (existingItem !== -1) {
			const updatedCart = [...cart]
			updatedCart[existingItem].quantity += quantity
			saveCart(updatedCart)
		} else {
			const newItem: CartItem = {
				...pizza,
				selectedIngredients,
				quantity,
			}
			saveCart([...cart, newItem])
		}
	}

	const removeFromCart = (itemId: string, selectedIngredients: string[]) => {
		const newCart = cart.filter(
			item =>
				!(
					item.id === itemId &&
					JSON.stringify(item.selectedIngredients) ===
						JSON.stringify(selectedIngredients)
				)
		)
		saveCart(newCart)
	}

	const getTotalPrice = () =>
		cart.reduce((total, item) => total + calculateItemPrice(item), 0)

	const clearCart = () => {
		setCart([])
		localStorage.removeItem('pizza-cart')
	}

	return { addToCart, cart, removeFromCart, getTotalPrice, clearCart }
}
