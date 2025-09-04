export interface Ingredient {
	id: string
	name: string
	price: number
}

export interface Pizza {
	id: string
	name: string
	basePrice: number
	image: string
	ingredients: Ingredient[]
}

export interface CartItem extends Pizza {
	quantity: number
	selectedIngredients: string[]
}