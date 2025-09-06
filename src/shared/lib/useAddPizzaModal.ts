import { useMemo, useState } from 'react'
import type { Pizza } from '../types/pizza'
import { calculateItemPrice } from './calculateItemPrice'
import { useAnimatedPrice } from './useAnimatedPrice'
import { toaster } from '@/components/ui/toaster'

interface useAddPizzaModalProps {
	pizza: Pizza | null
	onClose: () => void
	onAddToCart: (selectedIngredients: string[], quantity: number) => void
}

export const useAddPizzaModal = ({
	pizza,
	onAddToCart,
	onClose,
}: useAddPizzaModalProps) => {
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
	const [quantity, setQuantity] = useState(1)

	const totalPrice = useMemo(() => {
		if (!pizza) return 0

		const tempCartItem = {
			id: pizza.id,
			name: pizza.name,
			basePrice: pizza.basePrice,
			ingredients: pizza.ingredients,
			selectedIngredients,
			quantity,
			image: pizza.image,
		}

		return calculateItemPrice(tempCartItem)
	}, [pizza, selectedIngredients, quantity])

	const { previous: prevTotalPrice } = useAnimatedPrice(totalPrice)

	const handleAddToCart = () => {
		toaster.success({
			title: 'Пицца добавлена в корзину!',
			type: 'success',
			duration: 3000,
			closable: true,
		})
		onAddToCart(selectedIngredients, quantity)
		setSelectedIngredients([])
		setQuantity(1)
		onClose()
	}

	const increaseQuantity = () => setQuantity(q => q + 1)
	const decreaseQuantity = () => setQuantity(q => Math.max(q - 1, 1))

	const toggleIngredient = (ingredientId: string) => {
		setSelectedIngredients(prev =>
			prev.includes(ingredientId)
				? prev.filter(id => id !== ingredientId)
				: [...prev, ingredientId]
		)
	}

	return {
		selectedIngredients,
		quantity,
		totalPrice,
		prevTotalPrice,
		handleAddToCart,
		increaseQuantity,
		decreaseQuantity,
		setQuantity,
		toggleIngredient,
	}
}
