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

	return { addToCart, cart }
}
