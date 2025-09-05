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

	const addToCart = (pizza: Pizza, selectedIngredients: string[]) => {
		const existingItem = cart.find(
			item =>
				item.id === pizza.id &&
				JSON.stringify(item.selectedIngredients) ===
					JSON.stringify(selectedIngredients)
		)

		if (existingItem) {
			const updateCart = cart.map(item =>
				item.id === existingItem.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			)
			saveCart(updateCart)
		} else {
			const newItem: CartItem = {
				...pizza,
				selectedIngredients,
				quantity: 1,
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
		cart.reduce(
			(total, item) =>
				total +
				(item.basePrice +
					item.selectedIngredients.reduce(
						(sum, ingId) =>
							sum +
							(item.ingredients.find(ing => ing.id === ingId)?.price || 0),
						0
					)) *
					item.quantity,
			0
		)

	const clearCart = () => {
		setCart([])
		localStorage.removeItem('pizza-cart')
	}

	return { addToCart, cart, removeFromCart, getTotalPrice, clearCart }
}
