import type { CartItem } from "../types/pizza"

export const calculateItemPrice = (item: CartItem) => {
	const ingredientsPrice = item.selectedIngredients.reduce((sum, ingId) => {
		const ingredient = item.ingredients.find(ing => ing.id === ingId)
		return sum + (ingredient?.price || 0)
	}, 0)
	return (item.basePrice + ingredientsPrice) * item.quantity
}
